import router from "../routes";

class Auth {
    constructor() {
        this.token = window.localStorage.getItem('access_token');
        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;
        this.logged_in = window.localStorage.getItem('logged_in');
        this.forword = window.localStorage.getItem('wannaGoto')
        if (this.token) {
            // window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }

    }

    login(token, user,) {
        window.localStorage.setItem('access_token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('logged_in', "true")
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        window.localStorage.removeItem('wannaGoto')
        this.token = token;
        this.user = user;
        this.logged_in = "true"

        return this.forword || 'login'
    }

    check() {
        /*axios.get(`/api/dashboard`, data).then(e =>{
            if (e){
                if (e.status === 201 ){

                }
            }
        })*/
        return this.logged_in;
    }

    get(request) {
        return window.localStorage.getItem(request) ? window.localStorage.getItem(request) : false;
    }

    logout(wannaGoTo = null) {
        // save the route that the user want to go to, so he will be redirected to when he logs in
        if (wannaGoTo) {
            console.log(wannaGoTo)
            window.localStorage.setItem('wannaGoto', wannaGoTo)
        }

        // window.localStorage.clear();
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('logged_in');

        this.user = null;
        this.logged_in = "false";

        router.push('login')
    }
}

export default new Auth();
