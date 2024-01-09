<template>
    <div class="w-full flex-1 flex min-h-0">
        <div class="flex-1 border-x dark:border-gray-500 flex">
            <router-view name="chat_area"></router-view>
        </div>
        <div class="w-80 flex flex-col min-h-0 h-full border-b ">
            <div class="flex-1 overflow-y-auto roun ">
                <div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import use_users from '@/CRUD/user'

export default {

}
</script>
