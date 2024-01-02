import {ref} from "vue";
import axios from "@/axios/index.js";
export default ()=>{
    const quizzes = ref({})
    const storeErrors = ref({})
    const getQuizzes = async () => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/quiz/get_all`) .then(response => {quizzes.value = response.data })
        })
    }
    const storeQuiz = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/quiz/store`,data).catch(e=>storeErrors.value =e.response.data.errors )
        })
    }

    return {
        quizzes,
        storeErrors,
        getQuizzes,
        storeQuiz,
    }
}
