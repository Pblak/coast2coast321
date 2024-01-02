export default async function guest({context, store, params}) {
    let {to, from, next} = context
    const tenant = store.state.auth.tenant
    let isLoggedIn = store.state.auth.authenticated // Can be fetched through store
    let res = {data: {}}

    if (isLoggedIn && to.name !== 'home') {
        res.data.response = false
        res.data.go = {name: tenant ? 'dash' : 'cPanel'}
    } else {
        res.data.response = true
        res.data.go = true
    }
    return res
}
