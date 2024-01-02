<template>
    <div class="flex-1 flex flex-col gap-4 p-4 ">
        <div class="grid lg:grid-cols-4 gap-4 ">
            <div class="col-span-full ">
                <div class="flex flex-wrap gap-4 justify-center">


                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";
import use_competition from "@/CRUD/competition";
import use_quiz from "@/CRUD/quiz";
import {initialsToName, time_format} from '@/functions/helpers'
import {initFlowbite} from "flowbite";
import moment from "moment/moment";
import {ref, shallowRef} from "vue";
import _ from 'lodash';

export default {
    computed: {

    },
    updated() {

    },
    methods: {

    },
    mounted() {

    },
    watch: {

    },
    data() {
        return {

        }
    }

}
</script>
