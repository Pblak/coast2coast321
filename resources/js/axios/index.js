import axios from "axios";
import Global_loader from "../functions/Global_loader";
import store from "../store";
import {route_form_response, toast_form_response} from '@/functions/helpers'

const {GL_stop, GL_start} = Global_loader()


let instance = axios.create({
    /*baseURL: import.meta.env.VITE_REQUEST_BASE_URL+'/api/'*/
})
instance.defaults.headers.common['X-CSRF-TOKEN'] =
    $('meta[name="csrf-token"]').attr('content')

instance.interceptors.request.use(
    request => {
        request.headers.Authorization = `Bearer ${store.state.auth.token}`
        // request.headers['X-Socket-ID'] = window.Echo.socketId()
        GL_start()
        return request;
    },
    error => {
        throw error
    })
instance.interceptors.response.use(
    response => {
        Promise.resolve(response).then(r => {
            window.dispatchEvent(new Event('online'))
            GL_stop()
            /**
             * toast for responses
             */
            toast_form_response(r)

            route_form_response(r)
        })
        return response
    },
    error => {
        if (error.response.status === 441) {
            // when a visitor access request authenticate route
            store.dispatch('auth/logout')
            // console.log(error) CSRF token mismatch.
            // router.push({name: 'dash'})
        }
        if (error.response.status === 419 && error.response.data.message === 'CSRF token mismatch.') {
            location.reload()
        }
        if (error.code === 'ERR_NETWORK') {
            window.dispatchEvent(new Event('offline'))
        }
        /**
         * toast for errors responses
         */
        toast_form_response(error.response)

        GL_stop()
        throw error
    }
)
export default instance
