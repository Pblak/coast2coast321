import {createRouter, createWebHistory} from 'vue-router';
import home from "../layouts/pages/home.vue";
import login from "../layouts/pages/login.vue";
import login_cPanel from "../../views/components/_login_cpanel.vue";
import cPanel from "../layouts/cPanel.vue";
import middlewarePipeline from "@/middleware/middleware-pipeline.js";
import axios from "@/axios/index.js";
import store from "@/store/index.js";

const routes =
    [
        {
            path: '/',
            name: 'home',
            meta: {
                middleware: ['guest'],
            },
            redirect: {name:'login'},
            component: home
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                middleware: ['guest'],
            },
            component: login,
            redirect: {name: "login_cPanel"},
            children: [
                {
                    path: 'login_cPanel',
                    name: 'login_cPanel',
                    components: {
                        Auth: login_cPanel
                    },
                },
                {
                    path: 'register_cPanel',
                    name: 'register_cPanel',
                    components: {
                        Auth: () => import('../../views/components/register_cPanel.vue')
                    },
                }
            ]
        },

        {
            path: '/cPanel',
            name: 'cPanel',
            redirect: {name: 'list_houses'},
            meta: {
                middleware: "auth:cPanel",
            },
            component: cPanel,
            children: [
                {
                    path: 'profile',
                    name: 'profile',
                    meta: {
                        __name: 'Profile',
                        icon: '<i class="fa-thin fa-user"></i>',
                        current: false,
                        sideBar: false,
                    },
                    components: {
                        cPanel: () => import('../layouts/cPanel/profile/index.vue')
                    },
                },
                {
                    path: 'message',
                    name: 'message',
                    meta: {
                        __name: 'Message',
                        icon: '<i class="fa-thin fa-comments"></i>',
                        current: false,
                        sideBar: false,
                    },
                    redirect: {name: 'chat_area'},
                    components: {
                        cPanel: {
                            template: '<router-view name="message"></router-view>'
                        }
                    },
                    children:[
                        {
                            path:'chat_area',
                            name:'chat_area',
                            meta: {
                                __name: 'Chat & messaging',
                                toggle: false,
                                sideBar: false,
                            },
                            components:{
                                message:() => import('../layouts/cPanel/message/index.vue')
                            },
                            children:[
                                {
                                    path:'create_message/:id?',
                                    name:'create_message',
                                    meta: {
                                        __name: 'Messages',
                                        toggle: false,
                                        sideBar: false,
                                    },
                                    components:{
                                        chat_area:() => import('../layouts/cPanel/message/create_message.vue')
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'home',
                    meta: {
                        __name: 'Home',
                        icon: '<i class="fa-thin fa-chart-bar"></i>',
                        current: false,
                        sideBar: true,
                    },
                    components: {
                        cPanel: {
                            template: '<router-view name="home"></router-view>'
                        }
                    },
                    children: [
                        {
                            path: 'analytics',
                            name: 'analytics',
                            meta: {
                                __name: 'Analyse',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                home: () => import('../layouts/cPanel/home/analyse.vue')
                            },
                        },
                    ]
                },
                {
                    path: 'broker',
                    meta: {
                        __name: 'Broker & Landlord',
                        icon: '<i class="fa-thin fa-house-person-leave"></i>',
                        current: false,
                        sideBar: true,
                    },
                    components: {
                        cPanel: {
                            template: '<router-view name="broker"></router-view>'
                        }
                    },
                    children: [
                        {
                            path: 'list_broker',
                            name: 'list_broker',
                            meta: {
                                __name: 'Broker List',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                broker: () => import('../layouts/cPanel/broker_landlord/list_broker.vue')
                            },
                        },
                        {
                            path: 'list_landlord',
                            name: 'list_landlord',
                            meta: {
                                __name: 'Landlord List',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                broker: () => import('../layouts/cPanel/broker_landlord/list_landlord.vue')
                            },
                        },
                        {
                            path: 'create_renter',
                            name: 'create_renter',
                            meta: {
                                __name: 'Create new Renter',
                                toggle: false,
                                sideBar: false,
                            },
                            components: {
                                broker: () => import('../layouts/cPanel/broker_landlord/create_renters.vue')
                            },
                        },
                    ]
                },
                {
                    path: 'client',
                    meta: {
                        __name: 'client',
                        icon: '<i class="fa-thin fa-users"></i>',
                        current: false,
                        sideBar: false,
                    },
                    components: {
                        cPanel: {
                            template: '<router-view name="client"></router-view>'
                        }
                    },
                    children: [
                        {
                            path: 'list_clients',
                            name: 'list_clients',
                            meta: {
                                __name: 'List of the clients',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                client: () => import('../layouts/cPanel/client/list_clients.vue')
                            },
                        },
                    ]
                },
                {
                    path: 'houses',
                    meta: {
                        __name: 'Houses',
                        icon: '<i class="fa-thin fa-house-building"></i>',
                        current: false,
                        sideBar: true,
                    },
                    components: {
                        cPanel: {
                            template: '<router-view name="houses"></router-view>'
                        }
                    },
                    children: [
                        {
                            path: 'list_houses',
                            name: 'list_houses',
                            meta: {
                                __name: 'List of all the houses',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                houses: () => import('../layouts/cPanel/houses/list_houses.vue')
                            },
                        },
                        {
                            path: 'create_house',
                            name: 'create_house',
                            meta: {
                                __name: 'add house',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                houses: () => import('../layouts/cPanel/houses/create_house.vue')
                            },
                        },
                        {
                            path: 'edit_house/:id',
                            name: 'edit_house',
                            meta: {
                                __name: 'edit house',
                                toggle: false,
                                sideBar: false,
                            },
                            components: {
                                houses: () => import('../layouts/cPanel/houses/edit_house.vue')
                            },
                            beforeEnter: (to, from, next) => {
                                axios.post(`/api/cPanel/house/get_house`, {
                                    'subject': 'id',
                                    'value': to.params.id,
                                }).then((res) => {
                                    to.meta.data = res.data
                                    if (res.data.user_id ===  store.state.auth.user.id){
                                        next()
                                    }else {
                                        next({name: 'list_houses'})
                                    }
                                }).catch((err) => {
                                    next({name: 'list_houses'})
                                })
                            }
                        },
                        {
                            path: 'view_house/:id',
                            name: 'view_house',
                            meta: {
                                __name: 'house',
                                toggle: false,
                                sideBar: false,
                            },
                            components: {
                                houses: () => import('../layouts/cPanel/houses/view_house.vue')
                            },
                            beforeEnter: (to, from, next) => {
                                axios.post(`/api/cPanel/house/get_house`, {
                                    'subject': 'id',
                                    'value': to.params.id,
                                }).then((res) => {
                                    to.meta.data = res.data
                                    next()
                                }).catch((err) => {
                                    next({name: 'list_houses'})
                                })
                            }
                        },
                    ]
                },
                {
                    path: 'Finance',
                    meta: {
                        __name: 'Finance',
                        icon: '<i class="fa-thin fa-dollar-sign"></i>',
                        current: false,
                        sideBar: true,
                    },
                    components: {
                        cPanel: {
                            template: '<router-view name="finance"></router-view>'
                        }
                    },
                    children:[
                        {
                            path: 'list_finance',
                            name: 'list_finance',
                            meta: {
                                __name: 'List of all the finance',
                                toggle: false,
                                sideBar: true,
                            },
                            components: {
                                finance: {
                                    template:'<div>List of all the finance</div>'
                                }
                            },
                        },
                    ]
                }
            ]
        },
        {
            path: '/student/:id',
            name: 'student',
            component: () => import('../layouts/student/competition/index.vue'),
            beforeEnter: (to, from, next) => {
                axios.post(`/api/student/competition/get`, {
                    'subject': 'id',
                    'value': to.params.id,
                }).then((res) => {
                    to.meta.data = res.data
                    next()
                }).catch((err) => {
                    next({name: 'home'})
                })
            }
        }
    ];
const router = createRouter({
    linkActiveClass: '',
    linkExactActiveClass: '',
    history: createWebHistory(),
    routes: routes
})

/**
 * This callback runs before every route change, including on page load.
 */
router.beforeEach(async (to, from) => {
    return await middlewarePipeline({to, from})
});

router.beforeResolve((to, from, next) => {
    next()
})
export default router



