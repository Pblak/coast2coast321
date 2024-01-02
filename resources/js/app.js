import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import appLayouts from "@/layouts/app.vue";
import d_router from "./routes";
import store from "@/store/index.js";
import Button from "@/../views/components/_button.vue";
import InputError from "@/../views/components/_Input_error.vue";
import Tooltip from "@/../views/components/Tooltip.vue";
import 'mosha-vue-toastify/dist/style.css';
import VueDatePicker from '../../node_modules/@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'flowbite';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(appLayouts)

app.use(store)
app.use(d_router)
app.component('VueDatePicker', VueDatePicker);
app.component('Tooltip',Tooltip);
app.component('Btn', Button);
app.component('InputError', InputError);
app.mount('#app')
