import {ref} from "vue";
import axios from "@/axios/index.js";

export default () => {
    const houses = ref({})
    const house = ref({})
    const errors = ref({})
    const house_status = {
        'active': {
            __name: 'Active (Available)',
            display: true,
            allowed_to: {
                'pending': {},
                'unavailable': {},
            },
            class: 'bg-green-700 text-green-100',
            icon: 'mr-2 fa-solid fa-sparkles',
        },
        'pending': {
            __name: 'Pending (Under Review)',
            display: true,
            allowed_to: {
                'active': {},
                'unavailable': {},
            },
            class: 'bg-teal-300 text-teal-800',
            icon: 'mr-2 fa-duotone fa-hourglass-start',
        },
        'unavailable': {
            __name: 'Unavailable (Under Contract)',
            display: true,
            allowed_to: {
                'active': {},
                'pending': {},
            },
            class: 'bg-red-700 text-red-100',
            icon: 'mr-2 fa-duotone fa-octagon-xmark',
        },
    }
    const update_house = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/house/update_house`, data).then(response => {
                return house.value = response.data
            }).catch((e) => {
                errors.value = e.response.data.errors
            })
        })
    }
    const getHouse = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/house/get_house`).then(response => {
                return house.value = response.data
            })
        })
    }
    const getHouses = async () => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get(`/api/cPanel/house/get_all`).then(response => {
                houses.value = response.data
            })
        })
    }
    const storeHouse = async (data) => {
        return await axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post(`/api/cPanel/house/store`, data)
                .catch((e) => {
                    errors.value = e.response.data.errors
                })
        })
    }

    return {
        houses,
        house,
        errors,
        house_status,
        update_house,
        storeHouse,
        getHouse,
        getHouses
    }
}
