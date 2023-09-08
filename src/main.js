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

App.$appname = 'TicketShow'
App.$server = 'http://localhost:4433'
App.$api = 'http://localhost:8080/api'
App.$next = ''
App.$router = router
App.$header = () => {
    if (App.$auth_token == null) {
        App.$auth_token = window.localStorage.getItem('Authentication-Token');
        App.$$csrf = window.localStorage.getItem('csrf_token');
    } else if (App.$auth_token) {
        return {
            "Content-Type": "application/json", "Authentication-Token": App.$auth_token,
        }
    } else {
        console.log('token missing')
        App.$next = router.currentRoute.path
        router.push({path: 'login'})
    }
}