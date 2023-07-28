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
  render: h => h(App)
}).$mount('#app')
