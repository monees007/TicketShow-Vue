import Vue from 'vue'
import {createPinia, PiniaVuePlugin} from 'pinia'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './registerServiceWorker'


import router from './router'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = true
// Router setup


new Vue({
    pinia,
    router, data: {
        logged: false, admin: true, token: null,

    },
    render: h => h(App)
}).$mount('#app')

