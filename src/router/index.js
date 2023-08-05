import Vue from 'vue'
import VueRouter from 'vue-router'
// import pinia from "@/store/useTableEditorStore";
import {useTableEditorStore} from "@/store/useTableEditorStore"

Vue.use(VueRouter)


const routes = [
  //
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // we wanted to use the store here
//   const store = useTableEditorStore()
//
//   if (store.logged_in) next()
//   else next('/login')
// })

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useTableEditorStore()

  if (to.meta && !store.logged_in) return '/login'

})


export default router
