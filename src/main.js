import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

//styles
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/style/custom.scss'
//router
import router from './router'

//pwa
import './registerServiceWorker'

//pinia
import {createPinia, PiniaVuePlugin} from 'pinia'
//fonts
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
// charts
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('apexchart', VueApexCharts)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

library.add(far, fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = true


new Vue({
    router, pinia, render: h => h(App)
}).$mount('#app')
