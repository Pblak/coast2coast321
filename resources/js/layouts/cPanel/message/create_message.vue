<template>
    <div class="flex flex-col min-h-0 w-full" v-if="data">
        <div class="flex justify-between p-4 border-b dark:border-gray-500 " v-if="data.user_subject">
            <div class="flex gap-4 items-center justify-center">
                <div :style="'background-image: url(data:image/png;base64,'+data.user_subject.avatar +')'"
                     class="flex h-10 w-10 dark:bg-gray-700 justify-center items-center font-bold rounded-full bg-center bg-no-repeat bg-cover">
                    <span class="sr-only">Open user menu</span>
                    <span v-if="!data.user_subject.avatar"
                          class="">{{ (data.user_subject.name[0] + data.user_subject.name[1]).toUpperCase() }}</span>

                </div>
                <div class="flex flex-col gap-1">
                    <p>{{ data.user_subject.name }}</p>
                    <p class="text-xs ">{{ data.user_subject.email }}</p>
                </div>
            </div>

        </div>
        <div class="flex-1  min-h-0 overflow-y-auto" id="messages_container">
            <div class="flex-1  px-4">
                <template v-for="(init_msg,key) in data.messages">
                    <div class="mb-8">
                        <template v-for=" ( message,i)  in init_msg">
                            <div class="py-0.5 flex justify-end "
                                 v-if="message.from_id === store.state.auth.user.id">
                                <div class="w-fit px-4 py-2 rounded-full bg-blue-600 text-white"
                                     :class="msg_frame(i,init_msg )">
                                    {{ message.content }}
                                </div>
                            </div>
                            <div v-else class="py-0.5 ">
                                <div class=" w-fit px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
                                     :class="msg_frame(i,init_msg )">
                                    {{ message.content }}
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div class="p-4  border-t dark:border-gray-500">
            <div>
                <form action="" class="items-center flex gap-2" v-if="data.user_subject">
                    <div class="flex-1">
                        <textarea class="w-full appearance-none bg-transparent border-0 resize-none focus-ring-0
                        focus:outline-none focus:border-0 form_input" rows="1"
                                  :placeholder="'send a message to @'+data.user_subject.name"
                                  id="msg_content" v-model="msg_content"></textarea>
                    </div>
                    <div>
                        <Btn v-if="msg_content" icon-class="fa fa-send text-blue-500 text-lg -rotate-45" id="msg_send" :onClick="save" ></Btn>
                        <Btn v-else icon-class="fa fa-send -rotate-45 opacity-50" id="msg_send"  ></Btn>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import use_message from '@/CRUD/message'
import store from "@/store/index.js";

export default {
    computed: {
        store() {
            return store
        }
    },
    updated() {
        var yourDiv = $('#messages_container');
        var scrollHeight = yourDiv.prop('scrollHeight');
        yourDiv.scrollTop(scrollHeight);
    },
    methods: {
        msg_frame(i, msg) {
            let from_id = msg[i].from_id
            if (Object.values(msg).length === 1) return ''
            if (from_id === store.state.auth.user.id) {
                let is_first = i === 0 ? true : msg[i - 1].from_id !== store.state.auth.user.id
                let is_last = i === Object.values(msg).length - 1 ? true : msg[i + 1].from_id !== store.state.auth.user.id
                if (is_first && !is_last) {
                    return 'rounded-br-lg'
                }
                if (is_first && is_last) {
                    return ''
                }
                if (is_last) {
                    return 'rounded-tr-lg'
                } else {
                    return 'rounded-r-lg'
                }
            } else {
                let is_first = i === 0 ? true : msg[i - 1].from_id === store.state.auth.user.id
                let is_last = i === Object.values(msg).length - 1 ? true : msg[i + 1].from_id === store.state.auth.user.id
                if (is_first && !is_last) {
                    return 'rounded-bl-lg'
                }
                if (is_first && is_last) {
                    return ''
                }
                if (is_last) {
                    return 'rounded-tl-lg'
                } else {
                    return 'rounded-l-lg'
                }

            }
        },
        save(){
            this.store_message({
                to_id:this.$route.params.id,
                msg_content:this.msg_content,
            }).then((res)=>{
                this.msg_content = ''
                this.get_user_messages({
                    user_id: this.$route.params.id
                })
            })
        }
    },
    mounted() {
        if (this.$route.params.id) {
           setInterval(()=>{
               this.get_user_messages({
                   user_id: this.$route.params.id
               })
           },5000)
            $('#msg_content').off()
            $(document).on('keypress', '#msg_content', (e) => {
                // console.log(e)
                if (e.keyCode === 13 && !e.ctrlKey) {
                    $('#msg_send').click()
                } else {
                    return true
                }
                e.preventDefault()
            })
        }
    },
    data() {
        const {get_user_messages,store_message, messages} = use_message()

        return {
            data: messages,
            msg_content:'',
            store_message,
            get_user_messages,
        }
    }

}
</script>
