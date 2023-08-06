import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'bootstrap/dist/css/bootstrap.css'
// import '@/style/bootstrap-vue.css'
// import '@/style/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import './registerServiceWorker'
import {createPinia, PiniaVuePlugin} from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
// import '@/style/custom.scss'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = true
// Router setup


new Vue({
    router, data: {
        logged: false, admin: true, token: null,

    },
    pinia,
    render: h => h(App)
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
    }else if(App.$auth_token){
        return {
            "Content-Type": "application/json", "Authentication-Token": App.$auth_token,
        }
    } else {
        console.log('token missing')
        App.$next = router.currentRoute.path
        router.push({path: 'login'})
    }
}