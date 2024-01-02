<template>
    <div class="p-4 ">
        <div class="grid lg:grid-cols-6 grid-cols-1 gap-4">
            <div class="lg:col-span-full">
                <div class="dark:bg-gray-800 bg-gray-200  rounded-lg p-4 overflow-x-auto overflow-y-hidden">
                    <div class=" flex gap-6 w-fit items-center">
                        <div v-for="(image,key) in images" :key="key"
                             class="p-2  bg-no-repeat bg-center bg-cover  transition-all w-44 h-44"
                             :class="formData.selectedImage === key?'scale-125 shadow-lg':''"
                             :style="'background-image:url('+image.result+')'">
                            <div class="flex justify-between">

                                <button
                                    class="_btn _btn-danger opacity-60 hover:opacity-100  px-2 h-8 text-lg flex items-center"
                                    :class="formData.selectedImage === key?'_disabled':''"
                                    @click="deleteImage(key)">
                                    <i class="fa-duotone  fa-trash "></i>
                                </button>
                                <button class="_btn   hover:opacity-100 px-2 h-8 text-lg flex items-center"
                                        :class="formData.selectedImage === key?'_btn-success opacity-90':'_btn-primary opacity-40'"
                                        @click="()=>{formData.selectedImage = key}">
                                    <i class="fa-duotone  fa-check-circle "></i>
                                </button>

                            </div>
                        </div>
                        <label for="addImages" @change="addImage"
                               class="p-2 w-48 h-48 border-2 flex justify-center items-center !border-dashed !border-gray-500 rounded-lg">
                            <i class="fa-duotone fa-plus text-3xl"></i>
                            <input type="file" multiple name="addImage" id="addImages" class="hidden">
                        </label>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2">
                <div class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
                    <div class="relative z-0 w-full  group">
                        <input type="text" name="title" id="title"
                               placeholder=" " class="float_input peer" v-model="formData.title"/>
                        <label for="title" class="float_label">
                            Title
                        </label>
                        <InputError :error="errors.title"></InputError>
                    </div>
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div class="relative z-0  flex-1 group">
                            <input type="text" name="state" id="state" class="float_input peer"
                                   placeholder=" " v-model="formData.address.state"/>
                            <label for="state" class="float_label">
                                State
                            </label>
                            <InputError :error="errors['address.state']"></InputError>
                        </div>
                        <div class="relative z-0  flex-1 group">
                            <input type="text" name="city" id="city" class="float_input peer"
                                   placeholder=" " v-model="formData.address.city"/>
                            <label for="city" class="float_label">
                                City
                            </label>
                            <InputError :error="errors['address.state']"></InputError>
                        </div>
                        <div class="relative z-0  flex-1 group">
                            <input type="text" name="street" id="street" class="float_input peer"
                                   placeholder=" " v-model="formData.address.street"/>
                            <label for="street" class="float_label">
                                Street
                            </label>
                            <InputError :error="errors['address.street']"></InputError>
                        </div>
                        <div class="relative z-0  flex-1 group">
                            <input type="text" name="zip_code" id="zip_code" class="float_input peer"
                                   placeholder=" " v-model="formData.address.zip_code"/>
                            <label for="zip_code" class="float_label">
                                Zip code
                            </label>
                            <InputError :error="errors['address.zip_code']"></InputError>
                        </div>
                    </div>
                    <div class="flex gap-4 flex-wrap">
                        <div class="relative z-0 lg:w-auto w-full flex-1 group">
                            <input type="text" name="price" id="price" class="float_input peer"
                                   placeholder=" " v-model="formData.price"/>
                            <label for="price" class="float_label"> Price </label>
                            <InputError :error="errors.price"></InputError>
                        </div>

                        <div class="relative z-0 group lg:w-auto w-full">
                            <select id="listed_for" v-model="formData.listed_for"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="rent">Rent per month</option>
                                <option value="sell">Sell</option>
                            </select>
                        </div>
                    </div>

                    <div class="relative z-0 w-full  group">
                        <textarea class="form_input" v-model="formData.description"
                                  placeholder="Description"></textarea>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-4">
                <div class="flex flex-col gap-4 p-4 dark:bg-gray-800 bg-gray-200 rounded-lg">
                    <div class="">
                        <p class="text-2xl">Details</p>
                    </div>
                    <hr class="border-b-1  border-gray-500">
                    <div class="grid md:grid-cols-4 grid-cols-1 gap-4">
                        <div class="flex-col flex gap-4 dark:bg-gray-900 bg-gray-400 p-4 rounded-lg md:col-span-full ">
                            <div class="font-bold text-lg">
                                <p>Properties </p>
                            </div>
                            <div class="grid md:grid-cols-3 grid-cols-1 gap-4 ">
                                <div class="flex-col flex gap-2">
                                    <label for="status" class="flex justify-between text-sm">
                                        Status
                                    </label>
                                    <select id="status"
                                            v-model="formData.status"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="(status, key) in house_status" :value="key">
                                            {{ status.__name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="flex-col flex gap-2">
                                    <label for="property_type" class="flex justify-between text-sm">
                                        Property type
                                    </label>
                                    <input type="text" name="property_type" id="property_type" class="form_input peer"
                                           placeholder=" " v-model="formData.property_type"/>
                                    <InputError :error="errors.property_type"></InputError>
                                </div>
                            </div>
                        </div>
                        <div class="flex-col flex gap-4 dark:bg-gray-900 bg-gray-400 p-4 rounded-lg md:col-span-full ">
                            <div class="font-bold text-lg">
                                <p>Area & Measurement </p>
                            </div>
                            <div class="grid md:grid-cols-3 grid-cols-1 gap-4 ">
                                <div class="flex-col flex gap-2">
                                    <label for="measurement_unit" class="flex justify-between text-sm">
                                        <p>Unit</p>
                                        <var v-if="formData.measurement_unit" class="font-black">
                                            {{ formData.measurement_unit === 'meter' ? 'm' : 'ft' }}<sup>2</sup>
                                        </var>
                                    </label>
                                    <select id="measurement_unit"
                                            v-model="formData.measurement_unit"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="meter" selected>Meter square</option>
                                        <option value="foot">foot square</option>
                                    </select>
                                </div>
                                <div class="flex-col flex gap-2">
                                    <label for="building_size" class="flex justify-between text-sm">
                                        Building size
                                    </label>
                                    <input type="text" name="building_size" id="building_size" class="form_input peer"
                                           placeholder=" " v-model="formData.surfaceArea.building_size"/>

                                    <InputError :error="errors['surfaceArea.building_size']"></InputError>
                                </div>
                                <div class="flex-col flex gap-2">
                                    <label for="lot_size" class="flex justify-between text-sm">
                                        Lot size
                                    </label>
                                    <input type="text" name="lot_size" id="lot_size" class="form_input peer"
                                           placeholder=" " v-model="formData.surfaceArea.lot_size"/>

                                    <InputError :error="errors['surfaceArea.lot_size']"></InputError>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-col flex gap-4 dark:bg-gray-900 bg-gray-400 p-4 rounded-lg md:col-span-full ">
                        <div class="font-bold text-lg">
                            <p>Floors </p>
                        </div>
                        <div class="">
                            <Btn class="_btn _btn-success" icon-class="fa-duotone fa-plus-circle " :onClick="addFloor">
                                Add floor
                            </Btn>
                        </div>
                        <div class="grid lg:grid-cols-3 gap-4">
                            <div v-for="(floor,key) in formData.floors" :key="key"
                                 class="flex flex-col gap-4 p-4 dark:bg-gray-950 bg-gray-100 rounded-lg">
                                <div class="flex justify-end">
                                    <Btn icon-class="fa-duotone fa-trash !m-0 " class="_btn _btn-danger px-3 "
                                         :onClick="deleteFloor" :data="key"></Btn>
                                </div>
                                <div class="flex gap-4 ">
                                    <div class="relative z-0 flex-1 group">
                                        <label :for="'surfaceAreaValueFloor_'+key" class=" ">
                                            Surface Area
                                        </label>
                                        <input type="text" :id="'surfaceAreaValueFloor_'+key"
                                               v-model="formData.floors[key].surfaceArea.value"
                                               class="form_input "/>
                                    </div>
                                </div>
                                <div class="relative z-0 flex-1 group">
                                    <label :for="'roomsFloor_'+key" class="">
                                        Rooms
                                    </label>
                                    <input type="text" :id="'roomsFloor_'+key" v-model="formData.floors[key].rooms"
                                           class="form_input "/>
                                </div>
                                <div class="relative z-0 flex-1 group">
                                    <label :for="'showersFloor_'+key" class="text-sm">
                                        Showers
                                    </label>
                                    <input type="text" :id="'showersFloor_'+key" v-model="formData.floors[key].showers"
                                           class="form_input "/>
                                </div>
                                <div class="relative z-0 w-full  group">
                                    <textarea class="form_input" v-model="formData.floors[key].description"
                                              placeholder="About this floor"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
<!--
                    <div class="flex-col flex gap-4 bg-gray-900 p-4 rounded-lg md:col-span-full ">
                        <div class="font-bold text-lg">
                            <p>Floors </p>
                        </div>
                        <div>
                            <div class="flex-col flex gap-2">
                                <label class="" for="map_link">
                                    googl Map link
                                </label>
                                <input type="text" id="map_link" @input="handleMap"
                                       class="form_input "/>
                                <InputError :error="errors.map_link"></InputError>
                            </div>
                            <div>
                                <iframe
                                    width="600"
                                    height="450"
                                    frameborder="0"
                                    style="border:0"
                                    :src="formData.map_link"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
            </div>
            <div class="lg:col-span-full">
                <div class="flex justify-end">
                    <Btn class="_btn _btn-success text-lg" :onClick="save">
                        Save <!--:disabled="!formVerify()"-->
                    </Btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import use_house from '@/CRUD/house'

export default {
    data() {
        const images = ref([])
        const {storeHouse, errors, house_status} = use_house()
        return {
            images,
            errors,
            house_status,
            formData: {
                address: {state: '', city: '', street: '',zip_code: ''},
                selectedImage: 0,
                listed_for: 'rent',
                status: 'active',
                surfaceArea: {
                    lot_size: '',
                    building_size: ''
                },
                measurement_unit: 'meter',
                floors: []
            },
            storeHouse
        }
    },
    methods: {
        handleMap(){
            this.formData.map_link = event.target.value
        },
        deleteImage(key) {
            if (this.formData.selectedImage !== key) {
                this.images.splice(key, 1)
            }
            if (this.formData.selectedImage > 0 && this.formData.selectedImage > key) {
                this.formData.selectedImage--
            }
        },
        save() {
            let fd = new FormData();
            for (const k in this.images) {
                fd.append('image_' + k, this.images[k].file)
            }
            fd.append('title', this.formData.title)
            fd.append('address', JSON.stringify(this.formData.address))
            fd.append('price', this.formData.price)
            fd.append('listed_for', this.formData.listed_for)
            fd.append('status', this.formData.status)
            fd.append('property_type', this.formData.property_type)
            fd.append('surfaceArea', JSON.stringify(this.formData.surfaceArea))

            fd.append('measurement_unit', this.formData.measurement_unit)
            fd.append('description', this.formData.description)
            fd.append('selectedImage', this.formData.selectedImage)
            fd.append('floors', JSON.stringify(this.formData.floors))
            this.storeHouse(fd)
        },
        formVerify() {
            if (this.formData.title === '') return false;
            if (this.formData.address.state === '') return false;
            if (this.formData.address.city === '') return false;
            if (this.formData.address.street === '') return false;
            if (this.formData.address.zip_code === '') return false;
            if (!isFinite(this.formData.price)) return false
            if (this.formData.floors.length === 0) return false;

            for (const k in this.formData.floors) {
                let floor = this.formData.floors[k]
                if (isNaN(parseInt(floor.rooms))) return false
                if (isNaN(parseInt(floor.showers))) return false
                if (!isFinite(floor.showers)) return false
            }
            return true
        },
        addFloor() {
            this.formData.floors.push({
                rooms: '',
                showers: '',
                surfaceArea: {
                    value: '',
                    unit: ''
                },
                description: ''
            })
        },

        deleteFloor(key) {
            this.formData.floors.splice(key, 1)
        },
        addImage() {
            let fls = event.target.files
            const readAsDataURL = (files) => {
                var reader = new FileReader();
                const readFile = (index) => {
                    if (index >= files.length) return;
                    let file = files[index];
                    if (file.type.split('/')[0] === 'image') {
                        reader.onload = (e) => {
                            this.images.push({
                                selectedImage: false,
                                result: reader.result,
                                file: file
                            })
                            // do sth with bin
                            readFile(index + 1)
                        }
                        reader.readAsDataURL(file);
                    }
                }
                readFile(0);
            }
            readAsDataURL(fls)
        }
    },

}
</script>
