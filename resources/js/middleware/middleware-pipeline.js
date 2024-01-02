import store from "@/store";

/** don't touch my shit
 * ** sensitive stuff **
 */

/**
 *
 * @param context
 * @param middlewares
 * @param index
 * @returns {*|Promise<unknown>}
 */
async function render(context, middlewares, index) {
    let {to, from, next} = context
    if (!middlewares[index]) return next()
    let nextMiddleware, params
    if (typeof middlewares[index] === 'string') {
        nextMiddleware = middlewares[index].includes(':') ? middlewares[index].split(':')[0] : middlewares[index]
        params = middlewares[index].includes(':') ? middlewares[index].split(':')[1] : null
    }

    let path = nextMiddleware

    return import(`../middleware/${path}.js`).then((res)=>{

        return res.default({context, store, params})
            .then( r  => {
                if (!r.data) return false
                if (r.data.response) {
                    return middlewares[index + 1] ? render(context, middlewares, index + 1) : true
                } else {
                    return r.data.go
                }
            })
    })

}

/**
 *
 * @param context
 * @returns {*|Promise<*>}
 */
export default async function middlewarePipeline(context) {
    let {to, from, next} = context
    let middlewares = typeof to.meta.middleware === "object" ? to.meta.middleware : to.meta.middleware ? to.meta.middleware.split('|') : [];

    /**
     * get all middlewares this route and all the parent routes and removing the duplicated middleware
     * based on the child middleware first
     * eg : child  stats-order ["abilities:show_stats_finance" ]
     *      parent stats  ['abilities:show_stats_order|show_stats_employees|show_stats_finance|show_stats_map']
     *      parent dash  ["auth:store", "storeNotExpired"]
     *      output ["auth:store", "storeNotExpired" , "abilities:show_stats_finance" ]
     */
    let a = middlewares.map(x => x)
    a = getMiddlewares(to.matched, a)

    if (a.length === 0) return true
    return await render(context, a, 0)
}


function getMiddlewares(matched, a) {
    for (const k in matched) {
        let route = matched[k]
        if (route.meta.middleware) {
            const __middlewares = typeof route.meta.middleware === "object" ? route.meta.middleware : route.meta.middleware.split('|');
            for (const m in __middlewares) {
                let mm = __middlewares[m]
                let y = a.map(x => x.split(':')[0])
                if (!y.includes(mm.split(':')[0])) {
                    a.push(mm)
                }
            }
        }
    }
    return a
}
