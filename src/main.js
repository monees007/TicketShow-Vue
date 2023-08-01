import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue , IconsPlugin} from "bootstrap-vue";


import 'bootstrap/dist/css/bootstrap.css'
// import '@/style/bootstrap-vue.css'
// import '@/style/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
// import '@/style/custom.scss'



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = true

// Router setup



new Vue({
  router,
  data:{
    logged: false,
    admin:true,
    token: null,

  },
  render: h => h(App)
}).$mount('#app')

App.$appname = 'TicketShow'
App.$server = 'http://localhost:4433'
App.$api = 'http://localhost:8080/api'
App.$next = ''
App.$router = router
App.$header = (rType) => {
  if (App.$auth_token != null){
    return {
      method: rType,
      headers: {
        "Content-Type": "application/json",
        "Authentication-Token": App.$auth_token,
      }
    }
  }
  else {
    console.log('token missing')
    App.$next = router.currentRoute.path
    router.push({ path: 'login'})
  }
}