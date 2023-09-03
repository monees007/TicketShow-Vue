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
/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'


Vue.use(PiniaVuePlugin)
const pinia = createPinia()


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = true

// Router setup


library.add(far, fas)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)


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