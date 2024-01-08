<template>
    <div class="p-4 text-gray-700 dark:text-white">
        <div class="flex flex-col gap-4 max-h-[40rem]">
            <div class="flex-1  dark:bg-gray-800 bg-gray-200 rounded-t-lg">
                <div class="p-4 text-sm dark:text-gray-400  flex flex-wrap gap-4">


                    <div class="relative z-0 w-full md:w-2/5 group">
                        <input type="search" id="searchBook" class="float_input peer"
                               placeholder=" " v-model="search"/>
                        <label for="searchBook" class="float_label">
                            Search by name
                        </label>
                    </div>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="grid gap-4 flex-1 grid-cols-1 xl:grid-cols-2">
                    <div v-for="house in filteredItems" class="">
                        <div class="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                            <div class="flex flex-col gap-4">
                                <div class="flex  flex-wrap justify-between gap-4">
                                    <div class="flex gap-2 items-center flex-1">
                                        <div class="rounded-full w-14 h-14 bg-gray-900 bg-center bg-cover bg-no-repeat"
                                             :style="'background-image:url(data:image/png;base64,'+house.user.avatar+')'"></div>
                                        <div>
                                            <p class="font-bold">{{ house.user.name }}</p>
                                            <p class="text-xs">{{ house.user.email }}</p>
                                        </div>
                                    </div>
                                    <div
                                        class="flex gap-1 items-center  justify-content-end items-center w-fit ml-auto">
                                        <div>
                                            <button class="_btn _btn-default text-lg flex items-center p-2 ">
                                                <i class="fa-thin fa-heart !m-0"></i>
                                            </button>
                                        </div>
                                        <div>
                                            <router-link :to="{name:'view_house',params:{id:house.id}}"
                                                         class="_btn _btn-default text-lg  flex items-center p-2 ">
                                                <i class="fa-duotone fa-eye text-green-400 !m-0"></i>
                                            </router-link>
                                        </div>
                                        <div>
                                            <router-link :to="{name:'edit_house',params:{id:house.id}}"
                                                         class="_btn _btn-default text-lg  flex items-center p-2 ">
                                                <i class="fa-duotone fa-edit text-blue-400 !m-0"></i>
                                            </router-link>
                                        </div>
                                        <!--                                        <div >
                                                                                    <button :id="'houseSettingsBtn_'+house.id"
                                                                                            data-dropdown-placement="right-start"
                                                                                            data-dropdown-offset-skidding="40"
                                                                                            data-dropdown-offset-distance="-35"
                                                                                            :data-dropdown-toggle="'houseSettings_'+house.id"
                                                                                            class="_btn _btn-default text-lg flex items-center p-2">
                                                                                        <i class="fa fa-ellipsis !m-0"></i>
                                                                                    </button>
                                                                                    <div :id="'houseSettings_'+house.id"
                                                                                         class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                                                            :aria-labelledby="'houseSettingsBtn_'+house.id">
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                                                                                    out</a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>-->
                                    </div>
                                </div>
                                <hr class="dark:border-gray-700 border-gray-300 -mx-4">
                                <div class="flex flex-wrap gap-4">

                                    <div
                                        class="h-[15rem] bg-gray-700 w-[15rem] rounded-lg bg-center bg-no-repeat bg-cover mx-auto"
                                        :style="'background-image:url(\''+VITE_APP_URL+'/storage/'+house.images[house.selectedImage]+'\')'">
                                    </div>

                                    <div class="flex-1 ">
                                        <div class="flex flex-col gap-6 overflow-y-auto  /h-[15rem]">
                                            <div class="flex justify-between gap-6 ">
                                                <div class="flex-1 text-lg font-bold">
                                                    {{ house.title }}
                                                </div>
                                                <div class="flex flex-col gap-1 items-end">
                                                    <div>
                                                        <span
                                                            class=" text-sm btn px-3 py-1 rounded-full w-full inline-flex items-center font-bold"
                                                            :class="house_status[house.status].class ">
                                                            <i :class=" house_status[house.status].icon  "></i>

                                                             <p class="text-center w-full whitespace-nowrap capitalize">{{
                                                                     house.status
                                                                 }}</p>
                                                        </span>
                                                    </div>
                                                    <div class="flex gap-1 items-center">
                                                        <p class="text-sm text-green-400 font-bold">
                                                            {{
                                                                toCurrency(house.specification.price, {
                                                                    local: 'en-US',
                                                                    currency: 'USD'
                                                                })
                                                            }}
                                                        </p>
                                                        <b>·</b>
                                                        <p class="capitalize text-xs">{{
                                                                house.specification.listed_for
                                                            }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <div
                                                    class="grid md:grid-cols-3 grid-cols-2 gap-4 font-semibold text-xs">
                                                    <div class="flex flex-col gap-2  ">
                                                        <div class="">
                                                            Bedrooms
                                                        </div>
                                                        <p class="text-sm font-bold">
                                                            {{ countRooms(house.specification.floors) }}
                                                        </p>
                                                    </div>
                                                    <div class="flex flex-col gap-2  ">
                                                        <div class="">
                                                            Floors
                                                        </div>
                                                        <p class="text-sm font-bold">
                                                            {{ Object.keys(house.specification.floors).length }}
                                                        </p>
                                                    </div>
                                                    <div class="flex flex-col gap-2 ">
                                                        <p class="">
                                                            Lot size
                                                        </p>
                                                        <p class="text-sm font-bold">
                                                            {{ house.specification.surfaceArea.lot_size }}
                                                            <var class="font-black">
                                                                {{ house.measurement_unit === 'meter' ? 'm' : 'ft' }}
                                                                <sup>2</sup>
                                                            </var>
                                                        </p>
                                                    </div>
                                                    <div class="flex flex-col gap-2 ">
                                                        <p class="">
                                                            Building size
                                                        </p>
                                                        <p class="text-sm font-bold">
                                                            {{ house.specification.surfaceArea.building_size }}
                                                            <var class="font-black">
                                                                {{ house.measurement_unit === 'meter' ? 'm' : 'ft' }}
                                                                <sup>2</sup>
                                                            </var>
                                                        </p>
                                                    </div>
                                                    <div class="flex flex-col gap-2  ">
                                                        <p class="">
                                                            Property type
                                                        </p>
                                                        <p class="text-sm font-bold">
                                                            {{ house.specification.property_type }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                   <span
                                       class="p-1 px-2 border dark:border-gray-600 border-gray-300 bg-gray-200 dark:bg-gray-700 rounded-full text-xs capitalize">
                                       {{ time_format(house.created_at) }}
                                   </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!--                <div class="md:p-4 bg-gray-800 md:w-80 w-0 hidden xl:block rounded-lg">
                                    <pre v-if="filteredItems[0]">
                                        {{ filteredItems[0].specification }}
                                    </pre>
                                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import use_house from '@/CRUD/house'
import {ref} from "vue";
import {time_format, toCurrency} from "@/functions/helpers.js";
import {initFlowbite} from "flowbite";

export default {
    methods: {
        time_format,
        toCurrency,
        countRooms(floors) {
            return Object.values(floors).map(x => parseInt(x.rooms))
                .reduce((acc, currentValue) => acc + currentValue, 0)
        }
    },
    computed: {
        filteredItems() {
            return Object.values(this.houses).filter(item => {
                return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        },
    },
    mounted() {
        this.getHouses().then((res)=>{
            this.houses = res.data
        })
    },
    data() {
        const images = ref([])
        const {getHouses, houses, house_status} = use_house()
        return {
            search: '',
            VITE_APP_URL: import.meta.env.VITE_APP_URL,
            images,
            house_status,
            houses,
            getHouses,
        }
    }
}
</script>
