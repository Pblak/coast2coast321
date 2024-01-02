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
    return {
        errors,
        register,
    }
}
