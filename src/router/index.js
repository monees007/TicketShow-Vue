import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoardView from "@/views/DashBoardView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {requiresAuth: true},
    component: DashBoardView
  },

  {
    path:'/bookings',
    name: 'booking',
    meta: {requiresAuth: true},
    component: () => import('../views/BookingView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {requiresAuth: false},

    params: { next: '' },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {requiresAuth: false},

    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/show/:id',
    name: 'show',
    meta: {requiresAuth: true},
    component: () => import('../views/ShowView.vue')
  },
  {
    path: '/theatre/:id',
    name: 'theatre',
    meta: {requiresAuth: true},
    component: () => import('../views/TheatreView.vue')
  },
  {
    path: '/stats',
    name: 'stats',
    meta: {requiresAuth: true},
    component: () => import('../views/StatsView.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach(async (to, from) => {
//   if (      to.name ===  from.name  ) {
//     // redirect the user to the login page
//     return false
//   }
// })


export default router
