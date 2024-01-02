<script>
import Navbar from "@/../views/components/cp_navbar.vue";
import cp_sideBar from "../layouts/cPanel/cp_sideBar.vue";
import {ref} from "vue";
import {initFlowbite} from "flowbite";
export default {
    mounted() {
        initFlowbite()
    },
    updated() {
        initFlowbite()
    },
    data() {
        return {
            prevRoute: this.$route.name,
            transitionName: 'slide-right',
        }
    },
    components: {
        Navbar,
        cp_sideBar
    },
    name: "index",

}
</script>
<template>
    <div  class="flex min-h-screen w-full font-sans dark:bg-gray-900 dark:text-gray-50">
        <cp_sideBar></cp_sideBar>
        <main class="flex max-h-screen flex-1 flex-col bg-white  dark:bg-gray-900 overflow-y-auto
        transition-colors duration-500">
            <div  class="flex flex-col h-screen relative overflow-x-hidden overflow-y-auto ">
                <!-- Page Header Nav dashboard -->
                <div id="nav"
                     class="sticky top-0 right-0 left-0 z-[60]
                backdrop-blur-lg">
                    <navbar></navbar>
                </div>
                <!-- Page Content -->
                <router-view name="cPanel"></router-view>
            </div>
        </main>
    </div>
</template>
