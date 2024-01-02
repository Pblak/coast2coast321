<template>
    <div class="p-4 text-gray-700 dark:text-white" v-if="dataLoaded">
        <div class="flex flex-wrap gap-4">
            <div class="w-full lg:w-3/5 flex flex-col gap-4">
                <div class=" rounded-lg overflow-hidden">
                    <div id="house-images-carousel" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item relative" v-for="(image,key) in images " :key="key"
                                 :class="key===0?'active':''">
                                <div class="w-full h-[30rem] bg-no-repeat bg-cover bg-center"
                                     :style="'background-image:url('+VITE_APP_URL+'/storage/'+image.result+')'">
                                    <div :style="'background-image:url('+VITE_APP_URL+'/storage/'+image.result+')'"
                                         class="absolute bg-no-repeat bg-contain bg-center
                                top-0 left-0 bottom-0 right-0 backdrop-blur-lg dark:bg-gray-700/50 bg-gray-200/50  ">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#house-images-carousel"
                                data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#house-images-carousel"
                                data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col-span-3 col-start-1">
                    <div class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
                        <div class="text-2xl font-bold">
                            Floors
                        </div>
                        <div class="flex flex-col gap-4 h-[15.4rem] -mx-4">
                            <div class="flex-1 overflow-auto">
                                <table class="w-full text-left border-collapse table-auto">
                                    <thead>
                                    <tr class="text-xs uppercase dark:text-gray-400 dark:text-slate-300 text-slate-700 bg-gray-100/40 dark:bg-gray-700/50">
                                        <th class="sticky z-10 top-0 font-semibold bg-gray-300/75 px-5 py-4 dark:bg-gray-900/75  backdrop-blur shadow-sm">

                                        </th>
                                        <th class="sticky z-10 top-0 font-semibold bg-gray-300/75 px-5 py-4 dark:bg-gray-900/75  backdrop-blur shadow-sm">
                                            Rooms
                                        </th>
                                        <th class="sticky z-10 top-0 font-semibold bg-gray-300/75 px-5 py-4 dark:bg-gray-900/75  backdrop-blur shadow-sm">
                                            Showers
                                        </th>
                                        <th class="sticky z-10 top-0 font-semibold bg-gray-300/75 px-5 py-4 dark:bg-gray-900/75  backdrop-blur shadow-sm">
                                            Description
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(floor,key) in house.specification.floors" class="last:border-none border-b text-sm hover:dark:bg-gray-700
                                    hover:bg-gray-100 border-gray-200
                                    even:bg-transparent odd:bg-gray-300 odd:dark:bg-gray-900
                                    dark:border-gray-700 text-gray-700 dark:text-white">
                                        <td class="px-2 py-4     ">
                                            <p class="text-center text-lg font-bold">
                                                #{{ key + 1 }}
                                            </p>
                                        </td>
                                        <td class="px-5 py-4 capitalize">
                                            <p>{{ floor.rooms }}</p>
                                        </td>
                                        <td class="px-5 py-4">
                                            {{ floor.showers }}
                                        </td>
                                        <td class="px-5 py-4 w-96">
                                            <p class="truncate max-w-xs text-xs text-gray-500 dark:text-gray-400 "  >
                                                {{ floor.description }}
                                            </p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex-1 flex flex-col gap-4">
                <div class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg">
                    <div class="flex  flex-wrap justify-between gap-4">
                        <div class="flex gap-2 items-center flex-col">
                            <div class="rounded-lg w-60 h-80 bg-gray-900 bg-center bg-cover bg-no-repeat"
                                 :style="'background-image:url(data:image/png;base64,'+house.user.avatar+')'"></div>
                            <div class="text-center">
                                <p class="font-bold text-4xl">{{ house.user.name }}</p>
                                <p class="text-lg ">{{ house.user.email }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4 flex-1">
                            <div class="flex gap-2 justify-end">
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
                            </div>
                            <div class="flex flex-col gap-1 items-end">
                                <div>
                                    <div
                                        class=" text-lg btn px-3 py-1 rounded-full w-full inline-flex items-center font-bold"
                                        :class="house_status[house.status].class ">
                                        <i :class=" house_status[house.status].icon  "></i>
                                        <p class="text-center w-full whitespace-nowrap capitalize">
                                            {{ house.status }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex gap-1 items-center">
                                    <p class="text-2xl text-green-400 font-bold">
                                        {{
                                            toCurrency(house.specification.price, {
                                                local: 'en-US',
                                                currency: 'USD'
                                            })
                                        }}
                                    </p>
                                    <b>·</b>
                                    <p class="capitalize ">
                                        {{ house.specification.listed_for }}
                                    </p>
                                </div>
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
                </div>
                <div class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg">
                    <div class="flex flex-col gap-6 overflow-y-auto  /h-[15rem]">
                        <div class="flex justify-between gap-6 items-center">
                            <div class="flex-1 font-bold text-3xl">
                                {{ house.title }}
                            </div>
                            <div>
                                <span
                                    class="p-1 px-2 border dark:border-gray-600 border-gray-300 bg-gray-200 dark:bg-gray-700 rounded-full text-xs capitalize">
                                       {{ time_format(house.created_at) }}
                                   </span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="">
                                <div class="flex-1 font-bold text-xl">
                                    Aboute
                                </div>

                            </div>
                           <div>
                               {{house.description}}
                           </div>
                        </div>
                        <hr class="border-gray-700 border-1">
                        <div class="flex-1">
                            <div
                                class="grid md:grid-cols-3 grid-cols-2 gap-4 font-semibold text-xs">
                                <div class="flex flex-col gap-2  ">
                                    <div class="">
                                        Bedroom
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

        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import use_house from '@/CRUD/house'
import {time_format, toCurrency} from "@/functions/helpers.js";

export default {
    data() {
        const images = ref([])
        const {errors, house_status, getHouse, house} = use_house()

        return {
            VITE_APP_URL: import.meta.env.VITE_APP_URL,
            images,
            dataLoaded: false,
            errors,
            house_status,
            house,
            getHouse,
        }
    },
    async mounted() {
        await this.getHouse({
            subject: 'id',
            value: this.$props.id
        }).then(res => {
            res.images.map((img, i) => {
                this.images.push({
                    result: img,
                    index: i,
                })
            })
            setTimeout(() => {
                this.dataLoaded = true
            }, 800)
        })
    },
    methods: {
        time_format,
        toCurrency,
        handleMap() {
            this.formData.map_link = event.target.value
        },
        countRooms(floors) {
            return Object.values(floors).map(x => parseInt(x.rooms))
                .reduce((acc, currentValue) => acc + currentValue, 0)
        },
    },
}

</script>
