import defineAbilities from '@/functions/pluings/Castle/defineAbilities'
import {_if, array_has_keys} from '@/functions/helpers'

export default async function abilities({context, store, params}) {
    let {to, from} = context
    let abilities = await defineAbilities().then(r => r)
    params = params.split(",")
    let strict = params[1] || false
    let ability = params[0].split("|")
    let reg = /!==|===|==|!=/g

    ability = ability.map((aby) => {
        let a = aby.split(".")
        if (a.length === 1) return aby
        let params = a[1].split(reg)[0],
            value = a[1].split(reg)[1],
            operation = a[1].split(params)[1].split(value)[0]
        return _if(to.params[params], operation, value) ? a[0] : false
    }).filter((f)=>f!==false)

    /**
     * uncomment this "if statement" in order to this middleware works
     */
    if (ability.length>0 && !array_has_keys(abilities, ability, strict)) {
        return {
            data:{
                response:false,
                go:{name : "not_found"}
            }
        }
    }else {
        return {
            data:{
                response:true,
                go: true
            }
        }
    }
}
