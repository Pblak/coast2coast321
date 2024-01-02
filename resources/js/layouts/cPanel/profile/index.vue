<template>
    <div class="p-4 flex flex-col gap-4">
        <form id="updateProfile">
            <div class="dark:bg-gray-800 bg-gray-200 rounded-lg grid grid-cols-9 gap-4 p-4  flex-1">

                <div class="flex flex-col gap-4 items-center col-span-2">
                    <div class="w-52 h-52 bg-orange-100 rounded-lg bg-center bg-cover image_preview"
                         :style="'background-image: url(data:image/png;base64,'+ user.avatar+')'"></div>
                    <div>
                        <label for="avatar" class="">
                            <i class="fa-duotone fa-image-polaroid-user fa-lg"></i>
                            upload image
                        </label>
                        <input type="file" name="avatar" id="avatar" class="hidden" @change="changeAvatar">

                    </div>
                </div>
                <div class="col-span-7">

                </div>
                <hr class="col-span-full dark:border-gray-500">
                <div class="flex flex-col gap-4 col-span-5">
                    <div class="flex gap-4">
                        <div class="relative z-0 w-full  group">
                            <input type="text" name="name" id="name" class="float_input peer"
                                   :value="user.name "/>
                            <label for="name" class="float_label">
                                Name
                            </label>
                        </div>
                        <div class="relative z-0 w-full  group">
                            <input type="text" name="phone" id="institute_name" class="float_input peer"
                                   placeholder=" " :value="user.phone "/>
                            <label for="phone" class="float_label">
                                Phone
                            </label>
                        </div>
                    </div>
                    <div class="flex gap-4 flex-1">
                        <div>
                            <div class="form_input _disabled font-bold text-2xl">{{ user.email }}</div>
                        </div>
                    </div>
                    <div>
                        <Button :onClick="submit" class="_btn _btn-success py-3"
                                icon-class="fa-duotone fa-image-polaroid-user fa-lg">
                            Save
                        </Button>
                    </div>
                </div>
                <div class="col-span-4 ">
                    <div class="flex flex-col gap-4 dark:bg-gray-900 p-4 rounded-lg">
                        <div class=" text-xl">
                            <h3 class="font-bold">Security </h3>
                        </div>
                        <div class="flex-col gap-4 flex capitalize   ">
                            <div class="relative z-0 w-full  group">
                                <input type="password" name="old_password" id="old_password" class="float_input peer"
                                       placeholder=" "/>
                                <label for="old_password" class="float_label">
                                    current password
                                </label>
                            </div>
                            <div class="relative z-0 w-full  group">
                                <input type="password" name="password" id="password" class="float_input peer"
                                       placeholder=" "/>
                                <label for="password" class="float_label">
                                    password
                                </label>
                            </div>
                            <div class="relative z-0 w-full  group">
                                <input type="password" name="confirm_password" id="confirm_password"
                                       class="float_input peer"
                                       placeholder=" "/>
                                <label for="confirm_password" class="float_label">
                                    confirm password
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "@/axios/index.js";
import {ref} from "vue";
import Button from "@/../views/components/_button.vue";
import {mapActions} from "vuex";
export default {
    name: 'index',
    components: {
        Button
    },
    methods: {
        changeAvatar(event) {
            let read = new FileReader()
            let file = event.target.files[0]
            if (file.type.split('/')[0] !== 'image') return;
            read.onload = () => {
                let type = file.type.split('/')[1]
                $('.image_preview').css('background-image',"url(" + read.result  + ")")
            }
            read.readAsDataURL(file)
        },
        ...mapActions({
            signOut: "auth/logout"
        }),
        async submit() {
            let fd = new FormData(document.getElementById('updateProfile') );

            await axios.post('/api/cPanel/user/update', fd).then((res) =>{
                this.signOut()
            }).catch((err) =>{
                this.errors = err.response.data.errors
            })
        }
    },
    data() {
        return {
            form: {
                avatar: ''
            },
            user:this.$store.state.auth.user,
            errors: []
        }
    }
}
</script>
