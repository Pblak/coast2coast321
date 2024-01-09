<template>
    <aside id="cp_sideBar"
           :class="[isClosed?`w-[4rem] sticky hover:dark:bg-gray-800/50 hover:bg-gray-300/50
            md:hover:dark:bg-gray-800 md:hover:bg-gray-200 dark:bg-gray-800 bg-gray-200` :
          'fixed md:sticky w-64 md:dark:bg-gray-800 md:bg-gray-200 bg-gray-300/50 dark:bg-gray-800/50 ']"
           class="z-[90] flex-col flex top-0 bottom-0
          hover:w-64 hover:md:sticky hover:fixed group/aside max-h-screen hover:transition-[width]
          backdrop-blur-xl ">

        <div :class="[isClosed?'dark:group-hover/aside:bg-gray-800/40 md:dark:group-hover/aside:bg-gray-800 ' +
       ' group-hover/aside:bg-gray-200/40 md:group-hover/aside:bg-gray-200 dark:bg-gray-800 bg-gray-200 '
       :' dark:bg-gray-800/20 md:dark:bg-gray-800 ']"
             class=" ">
            <a class="flex items-center justify-center gap-x-4 px-8 h-16
                   text-2xl font-medium dark:text-slate-100 text-gray-700 focus:outline-none"
               type="button">
                <span><i class="fa fa-dashboard dark:font-extralight"></i></span>
                <span :class="[isClosed?'hidden':'md:block']" class="pt-1 group-hover/aside:block ">
               Dashboard
            </span>
            </a>
        </div>
        <ul class="overflow-y-auto flex-1 mt-4 mb-7">
            <template v-for="(item,i) in navs.children" :key="i">
                <li class="relative group"
                    v-if="typeof  item.meta.sideBar === 'undefined' || item.meta.sideBar === true ">

                    <button :class="[isClosed?' px-6 group-hover/aside:px-6 ':'px-6']"
                            class="flex items-center justify-center md:justify-start w-full  py-5
                        text-base font-normal dark text-slate-700 transition duration-75
                         md:hover:bg-gray-300 hover:bg-gray-400/30 dark:text-white
                         md:dark:hover:bg-gray-700 dark:hover:bg-gray-700/50"
                            type="button" @click="toggle_render(i)">

                         <span
                             class="flex-shrink-0 w-6 h-6 text-lg
                          duration-75 group-hover:text-gray-900 dark:group-hover:text-white
                          transition-all group-hover:scale-125  "
                             v-html=" item.meta.icon "></span>

                        <span :class="[isClosed?'hidden':'md:block']"
                                      class="flex-1 ml-6 text-left whitespace-nowrap group-hover/aside:block ">
                               {{ item.meta.__name }}
                        </span>
                    </button>

                    <ul :class="[isClosed ? !item.meta.current && !parentActive(item) ? 'h-0'
                                :'h-0 group-hover/aside:py-2 group-hover/aside:h-fit'
                          : !item.meta.current && !parentActive(item) ? 'h-0' :'py-2' ]"
                        class="dark:bg-gray-900/60 overflow-hidden z-50 md:static
                           transition-all duration-200 md:bg-gray-100 bg-white/10">
                        <template v-for="child in item.children ">
                            <li v-if="child.meta.sideBar">
                                <router-link :class="[childActive(child) ?
                            'font-black dark:text-gray-200': 'font-normal dark:text-gray-400']"
                                             :to="{name :child.name}"
                                             class="flex text-xs relative items-center px-2 py-3 pl-11 w-full text-base text-gray-900
                                     transition duration-75 group dark:hover:text-gray-300 whitespace-nowrap
                                     before:absolute before:content-[''] before:bottom-0 before:left-7 before:right-7
                                     before:h-1 before:rounded hover:before:bg-fuchsia-600 ">
                                    {{ child.meta.__name }}
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </li>
            </template>

        </ul>
        <div class="sticky flex justify-center items-center py-2">
            <a class="rounded-full w-10 h-10 flex items-center justify-center
                   bg-gray-400 dark:bg-slate-900 text-gray-700 dark:text-gray-100" type="button"
               @click="toggleIsClosed">
                <i :class="[isClosed?`fa-angles-left`:`fa-angles-right`]" class="fa-duotone "></i>
            </a>
        </div>
        <div v-if="(!online || showBackOnline)" class="p-2 relative">
            <div id="statusNetwork" class=" z-50 absolute left-2 bottom-2 px-5 py-3 flex items-center
                  dark:bg-gray-200 bg-gray-700 space-x-3 bg-opacity-95 rounded-lg">
                <div class="relative flex items-center justify-center ">
                    <i :class="[!online?'after:w-full text-red-600 after:border-b-[2px]'
                           :'after:w-0 text-green-600  after:border-b-[0px]']"
                       class="fa fa-wifi filter text-xl after:content-[''] flex items-center justify-center
                           after:rotate-45  after:absolute after:bg-current after:filter
                           after:rounded relative animate-pulse after:transition-all after:h-1
                           dark:after:border-gray-200 after:border-gray-700 "></i>
                </div>
                <div class="dark:text-gray-800 text-white text-sm">
                    <div v-if="!online">
                        <p class="text-lg font-light ">Off line</p>
                        <p class="text-xs dark:text-gray-500 text-gray-300 font-bold  whitespace-nowrap">Verifier voter
                            connection internet</p>
                    </div>
                    <div v-else class="">
                        <p class="text-lg font-light ">On line</p>
                        <p class="text-xs dark:text-gray-500 text-gray-300 font-bold  whitespace-nowrap">Votre connexion
                            Internet a été restaurée
                        </p>
                    </div>
                </div>
                <div v-if="!online">
                    <button class="flex items-center justify-center p-2 dark:bg-gray-300 bg-gray-900 dark:text-gray-700
                    text-gray-300 rounded-full w-7 h-7 hover:dark:bg-gray-400 transition-colors hover:bg-gray-600 hover:text-white"
                            @click="event=>{toggleStatusOnline({translateX:'-150%'})}">
                        <i class="fa-thin fa-times-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>
<style scoped>
.group-aside:hover > .group-aside_item {
    display: block;
}
</style>
<script>
import store from "@/store";
import anime from "animejs/lib/anime.es.js";
import {ref} from "vue";

export default {
    name: "cp_sideBar",
    components: {},
    methods: {
        updateOnlineStatus(e) {
            const {type} = e
            this.online = type === 'online'
        },
        toggleStatusOnline(props = {}, call = null) {
            let n = anime({
                targets: '#statusNetwork',
                translateX: props.translateX,
                easing: 'easeInOutCirc',
                complete: (e) => {
                    if (!call && typeof call !== 'function') return
                    call(e)
                }
            })
        },
        toggleIsClosed() {
            if (this.isClosed === true) {
                window.localStorage.setItem('sideBarClosed', false)
                this.isClosed = false
            } else {
                window.localStorage.setItem('sideBarClosed', true)
                this.isClosed = true
            }
        },
        setIsClosed() {
            if ($(document).width() > 720) {
                window.localStorage.setItem('sideBarClosed', false)
            } else {
                window.localStorage.setItem('sideBarClosed', true)
            }
            this.isClosed = window.localStorage.getItem('sideBarClosed') !== 'false'
        }
    },
    watch: {
        online(val) {
            if (val) {
                let _this = this
                _this.showBackOnline = true
                _this.toggleStatusOnline({translateX: '0%'},
                    (e) => {
                        setTimeout(() => {
                            _this.toggleStatusOnline({translateX: '-150%'},
                                (e) => {
                                    _this.showBackOnline = false
                                })
                        }, 5000)

                    }
                )
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus)
        window.removeEventListener('offline', this.updateOnlineStatus)
    },
    mounted() {
        this.setup_navLinks()
        this.setIsClosed()
        window.addEventListener('online', this.updateOnlineStatus)
        window.addEventListener('offline', this.updateOnlineStatus)

    },
    data() {
        const dashboard_name = 'cPanel'
        const isClosed = ref(false)
        const toggle_render = (key) => {
            let e = this.navs.children[key].meta.current
            this.navs.children.map((item) => {
                item.meta.current = false
            })
            this.navs.children[key].meta.current = !e
        }
        const childActive = (child) => {
            let res = false
            if (child.name === this.$route.name) {
                res = true
            } else {
                if (child.children) {
                    child.children.map((subChild) => {
                        if (subChild.name === this.$route.name) {
                            res = true
                        }
                    })
                }
            }
            return res

        }

        const parentActive = (parent, child = true) => {
            let res = false
            if (!parent.children) return res
            parent.children.map((child) => {
                if (child.name === this.$route.name || this.childActive(child)) {
                    res = true
                }
            })
            return res
        }

        const setup_navLinks = () => {
            let a = this.$router.resolve({
                name: this.dashboard_name,
            }).matched

            for (let i in a) {
                let item = a[i]
                if (item.name === this.dashboard_name) {
                    this.navs = item
                    break;
                }
            }
        }

        return {
            toggle_render,
            setup_navLinks,
            parentActive,
            childActive,
            isClosed,
            dashboard_name,
            user: store.state.auth.user,
            navs: [],
            online: navigator.onLine,
            showBackOnline: false,
            hideShowOffline: false,
        }
    },
}
</script>

