import {ref} from "vue";
import axios from "@/axios/index.js";

export default ()=>{
    const storeErrors =ref({})
    const competition =ref({})
    const competitions =ref({})
    const store_competition = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/competition/store` ,data)
                .catch((e)=> {
                    storeErrors.value = e.response.data.errors
                })
        })
    }

    const get_competition = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/competition/get`, data).then(res=>competition.value = res.data)
                .catch((e) => {
                    storeErrors.value = e.response.data.errors
                })
        })
    }
    const delete_competition = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/competition/delete`, data).then(res=>competition.value = res.data)
                .catch((e) => {
                    storeErrors.value = e.response.data.errors
                })
        })
    }
    const get_competitions = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/competition/get_all`, data).then(res=>competitions.value = res.data)

        })
    }
    const store_answer = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/competition/storeAnswer`, data)
        })
    }
    const if_student_exist = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/student/if_student_exist`, data)
        })
    }
    return{
        if_student_exist,
        store_answer,
        competition,
        competitions,
        storeErrors,
        delete_competition,
        get_competition,
        get_competitions,
        store_competition
    }
}
