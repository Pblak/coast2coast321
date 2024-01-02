import {ref} from "vue";
import axios from "@/axios/index.js";
export default ()=>{
    const books = ref({})
    const levels = ref({})
    const getBooks = async () => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/book/get_all`) .then(response => {books.value = response.data })
        })
    }
    const getLevels = async () => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/book/get_levels`) .then(response => {levels.value = response.data })
        })
    }

    return {
        books,
        levels,
        getBooks,
        getLevels,
    }
}
