<template>
    <div class="w-full flex-1 flex text-gray-800 dark:text-white min-h-0 border-t dark:border-gray-500 ">
        <div class="flex-1 border-x dark:border-gray-600 border-gray-400 flex">
            <router-view name="chat_area"></router-view>
        </div>
        <div class="w-80 flex flex-col min-h-0 h-full ">
            <div class="flex-1 overflow-y-auto ">

                <div class="divide-y dark:divide-gray-600 divide-gray-400 ">
                    <template v-for="(user,k) in users" :key="user.id">
                        <div class="hover:bg-blue-400/50"
                             v-if="user.id !== store.state.auth.user.id">
                            <router-link :to="{name:'create_message',params:{id:user.id}}"
                                         class="py-2 px-4 block"
                                active-class="bg-blue-600 text-white">
                                <div class="flex gap-2">
                                    <div :style="'background-image: url(data:image/png;base64,'+user.avatar +')'"
                                         class="flex h-10 w-10 dark:bg-gray-700 justify-center items-center font-bold rounded-full bg-center bg-no-repeat bg-cover">
                                        <span class="sr-only">Open user menu</span>
                                        <span v-if="!user.avatar"
                                              class="">{{ (user.name[0] + user.name[1]).toUpperCase() }}
                                        </span>

                                    </div>
                                    <div class="flex flex-col gap-1 w-48">
                                        <p class=" truncate font-bold">{{ user.name }}</p>
                                        <p class=" truncate " v-if="user.latest_message">
                                            <span class="font-black "
                                                  v-if="user.latest_message.from_id === store.state.auth.user.id">Me: </span>
                                            <span class="text-xs" >
                                                {{ user.latest_message.content }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import use_message from '@/CRUD/message'
import {ref} from "vue";
import store from "@/store/index.js";

export default {
    computed: {
        store() {
            return store
        }
    },
    updated() {

    },
    mounted() {
        this.get_latest_user_message().then((res) => {
            this.users = res.data
        })
        window.addEventListener('newMessage',  (e)=> {
            console.log(e)
            this.get_latest_user_message().then((res) => {
                this.users = res.data
            })
        })
    },
    data() {
        const {get_latest_user_message} = use_message()
        return {
            get_latest_user_message,
            users: ref('')
        }
    }
}

</script>
