import {ref} from "vue";
import axios from "@/axios/index.js";

export default () => {
    const errors = ref({})
    const register = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/register`, data)
                .catch(err => {
                    errors.value = err.response.data.errors
                })

        })
    }
    const get_users = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/user/get_all`)
                .catch(err => {
                    errors.value = err.response.data.errors
                })

        })
    }
    const get_user = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/user/get_user`,data)
                .catch(err => {
                    errors.value = err.response.data.errors
                })

        })
    }
    return {
        errors,
        get_user,
        register,
        get_users,
    }
}
