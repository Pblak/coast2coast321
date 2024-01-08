<template>
    <div class="flex-1 flex flex-col gap-4 p-4 ">
        <div class="grid lg:grid-cols-4 gap-4 ">
            <div class="col-span-2 ">
                <div class="flex flex-wrap gap-4 justify-center">
                    <chart_ id="acquisitions"
                            :dataSets="[
                                                    {
                                                        label: 'Acquisitions by year',
                                                        data: data.map(row => row.count),
                                                        tension: 0.2
                                                    },
                                                ]"
                            :labels=" data.map(row => row.year)"></chart_>
                </div>
            </div>
            <div class="col-span-2 ">
                <div class="flex flex-wrap gap-4 justify-center">
                    <chart_ id="newChart" :chart-type=" 'line'"
                            :dataSets="[
                                                    {
                                                        label: 'Acquisitions by year',
                                                        data: data.map(row => row.count),
                                                        tension: 0.2
                                                    },
                                                    {
                                                        label: 'Acquisitions by year',
                                                        data: [44, 20, 60, 120, NaN, 100, 10, 10],
                                                        tension: 0.2
                                                    },
                                                ]"
                            :labels=" data.map(row => row.year)"></chart_>
                </div>
            </div>
            <div class=" ">
                <div class="flex flex-col gap-4 dark:bg-gray-800 p-4 rounded-lg">
                    <div class="text-2xl font-bold ">
                        Top users
                    </div>
                    <div id="users_radar" class="carousel slide w-full">
                        <div class="carousel-inner">
                            <div v-for="(user,key) in users" class="carousel-item" :key="key"
                                 :class="key===0?'active':''">
                                <div class="block w-full px-14">
                                    <div class=" mx-auto shadow-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                                     p-4 rounded-lg flex flex-col gap-4">
                                        <div class=" ">
                                            <chart_ :id="'canvas_user_'+user.id" :chart-type=" 'radar'"
                                                    :dataSets="userChart(user.id).dataSets"
                                                    :labels="userChart(user.id).labels"
                                                    :options="userChart(user.id).options"
                                                    data-style="'width: '+(width||'100%')+';height: '+(height||'50vh')+';'"
                                                    data-update-color="updateColor"></chart_>
                                        </div>
                                        <div class="flex gap-4 items-center">
                                            <div class="rounded-full w-10 h-10 bg-no-repeat bg-center bg-cover flex items-center
                                                                                     border border-gray-300 dark:border-gray-700 justify-center "
                                                 :style="'background-image: url(data:image/png;base64,'+user.avatar+')'">

                                                                                        <span v-if="!user.avatar"
                                                                                              class="">{{
                                                                                                (user.name[0] + user.name[1]).toUpperCase()
                                                                                            }}</span>
                                            </div>
                                            <div class="flex flex-col gap-2">
                                                <p class="font-bold"> {{ user.name }}</p>
                                                <p class="text-sm"> {{ user.email }}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#users_radar"
                                data-bs-slide="prev">
                            <i class="fa fa-arrow-left text-gray-900 dark:text-gray-200 "></i>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#users_radar"
                                data-bs-slide="next">
                            <i class="fa fa-arrow-right text-gray-900 dark:text-gray-200 "></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="md:col-span-3 ">
                <div class="flex flex-col gap-4 dark:bg-gray-800 bg-gray-200 p-4 rounded-lg">
                    <div class="text-2xl font-bold ">
                        Popular Flats & houses
                    </div>
                    <table id="houseTable" class="display"> </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";
import use_users from "@/CRUD/user.js";
import use_house from "@/CRUD/house.js";
import chart_ from '@/../views/components/_chart.vue'
import {getRandomInt, toCurrency} from "@/functions/helpers.js";
import DataTable from "datatables.net-dt";

export default {
    components: {
        chart_
    },
    methods: {
        Chart,
        userChart(id) {
            let user = this.users.filter((r) => r.id === id)[0]
            return {
                dataSets: [
                    {
                        label: 'activity',
                        data: [getRandomInt(120, 500), getRandomInt(120, 500), getRandomInt(120, 500), getRandomInt(120, 500)]
                    },
                    {
                        label: 'Logs',
                        data: [getRandomInt(120, 500), getRandomInt(120, 500), getRandomInt(120, 500), getRandomInt(120, 500)]
                    }
                ],
                labels: ['selles', 'Listing', 'views', 'other'],
                options: {
                    scales: {
                        r: {
                            grid: {},
                            ticks: {
                                display: false, // Hide Y axis labels
                                beginAtZero: true,
                            },
                        },
                        x: {
                            display: false,
                            grid: {},
                            position: 'top',
                            ticks: {
                                display: false // Hide Y axis labels
                            },
                        },
                        y: {
                            display: false,
                            ticks: {
                                display: false // Hide Y axis labels
                            },
                        }
                    },

                }
            }
        },
        countRooms(floors) {
            return Object.values(floors).map(x => parseInt(x.rooms))
                .reduce((acc, currentValue) => acc + currentValue, 0)
        }
    },
    mounted() {
        this.get_users().then((res) => {
            this.users = res.data
        })
        this.getHouses().then((res) => {
            this.houses = res.data
            $('#houseTable').DataTable({
                data: this.houses,
                columnDefs: [
                    {
                        render: (data, type, row) => {
                            return row.title
                        },
                        targets: 0,
                        title: 'title'
                    },
                    {
                        title: 'Bedrooms',
                        render: (data, type, row) => {
                            return this.countRooms(row.specification.floors)
                        },
                        targets: 1,

                    },
                    {
                        title: 'Floors',
                        render: (data, type, row) => {
                            return Object.keys(row.specification.floors).length
                        },
                        targets: 2
                    },
                    {
                        title: 'Lot size',
                        render: (data, type, row) => {
                            return `<p class="text-sm font-bold">
                                                             ${row.specification.surfaceArea.lot_size}
                                                            <var class="font-black">
                                                                  ${row.measurement_unit === 'meter' ? 'm' : 'ft'}
                                                                <sup>2</sup>
                                                            </var>
                                                        </p>`
                        },
                        targets: 3
                    },
                    {
                        title: 'Building size',
                        render: (data, type, row) => {
                            return `<p class="text-sm font-bold">
                                                             ${row.specification.surfaceArea.building_size}
                                                            <var class="font-black">
                                                                  ${row.measurement_unit === 'meter' ? 'm' : 'ft'}
                                                                <sup>2</sup>
                                                            </var>
                                                        </p>`
                        },
                        targets: 4
                    },
                    {
                        title: 'Property type',
                        render: (data, type, row) => {
                            return row.specification.property_type
                        },
                        targets: 5
                    },
                    {
                        title: 'Status',
                        render: (data, type, row) => {
                            return `<span class="${this.house_status[row.status].class} text-sm btn px-3 py-1 rounded-full w-full inline-flex items-center font-bold">
                                        <i  class=" ${this.house_status[row.status].icon}  "></i>
                                         <p class="text-center w-full whitespace-nowrap capitalize">${row.status} </p>
                                    </span>`
                        },
                        targets: 6
                    },
                    {
                        title: 'Price',
                        render: (data, type, row) => {
                            return toCurrency(row.specification.price, {
                                local: 'en-US',
                                currency: 'USD'
                            })
                        },
                        targets: 7
                    }
                ]
            });
        })
    },

    data() {

        const {get_users, errors} = use_users()
        const {getHouses, houses, house_status} = use_house()
        const data = [
            {year: 2016, count: 10},
            {year: 2017, count: 20},
            {year: 2018, count: 15},
            {year: 2019, count: 25},
            {year: 2020, count: 22},
            {year: 2021, count: 30},
            {year: 2022, count: 28},
            {year: 2023, count: 28},
        ];


        return {
            data,
            users: [],
            house_status,
            houses,
            getHouses,
            get_users,
        }
    }

}
</script>
