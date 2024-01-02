<template>
    <router-view/>

</template>

<script>
import {initFlowbite} from "flowbite";
import {toggleTheme} from "../functions/helpers.js";

export default {
    name: "app",
    methods: {toggleTheme},
    updated() {
        initFlowbite()
    },
    mounted() {
        this.toggleTheme(localStorage.getItem('color-theme'))
        initFlowbite()
         $(document).ready(() => {
             $('body').tooltip({
                 selector: '[data-bs-toggle="tooltip"]',
                 trigger: 'hover focus'
             })

             $('#app').popover({
                 selector: '[data-bs-toggle="popover"]',
                 trigger: 'hover focus'
             })
             $(document).on('show.bs.tooltip mouseleave click ', function (e) {
                 $('.tooltip').remove()
             })
         })
    }
}
</script>

