import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'empty' },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: { layout: 'main' },
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('../views/Record.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
