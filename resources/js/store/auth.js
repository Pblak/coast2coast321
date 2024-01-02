import router from '../routes/index'

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        token: '',
        tenant: false,
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_TENANT(state, value) {
            state.tenant = value
        },
        SET_TOKEN(state, value) {
            state.token = value
        },
        SET_ABI(state, value) {
            state.token = value
        }
    },
    actions: {
        login_cPanel({commit}, process) {
            console.log(process)
            commit('SET_USER', process.response.data.user)
            commit('SET_AUTHENTICATED', true)
            commit('SET_TENANT', false)
            commit('SET_TOKEN', process.response.data.token)
            //router.push(process.push())
            window.location.href = router.resolve(process.push()).href
        },
        logout({commit}) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
            commit('SET_TENANT', false)
            commit('SET_TOKEN', null)
            window.location.href =router.resolve({name:'login'}).href
            //router.push({name: "login"})
        }
    }
}
