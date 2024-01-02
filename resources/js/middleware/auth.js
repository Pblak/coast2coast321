
export default async function auth({context, store, params}) {
    let {to, from} = context
    const isLoggedIn = store.state.auth.authenticated
    let res = { data:{} }

    if (!isLoggedIn){
        res.data.response = false
        res.data.go = {name: 'login'}
    }else {
        res.data.response = true
        res.data.go = true
    }
    return  res
}
