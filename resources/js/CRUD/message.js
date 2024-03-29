import {ref} from "vue";
import axios from "@/axios/index.js";

export default () => {
    const errors = ref({})
    const messages = ref({})
    const get_user_messages = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/message/get_user_messages`,data).then((res)=>{
                  return messages.value = res.data
            }) .catch(err => {
                    errors.value = err.response.data.errors
                })
        })
    }


    const store_message = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/message/store`,data).catch(err => {
                    errors.value = err.response.data.errors
                })
        })
    }

    /**
     * get the latest  message from each user
     * and auth()->id() as subject user
     */
    const get_latest_user_message = async () => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/message/get_latest_user_message`)
                .catch(err => {
                errors.value = err.response.data.errors
            })
        })
    }

    return {
        messages,
        errors,
        store_message,
        get_latest_user_message,
        get_user_messages
    }
}
