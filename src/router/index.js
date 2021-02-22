import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


import biaobai from '../components/biaobai'
import exchange from '../components/exchange'
import picwall from '../components/picwall'
import space from '../components/space'
import moive from '../components/moive'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: "/exchange", component: exchange },
      { path: "/biaobai", component: biaobai },
      { path: "/picwall", component: picwall },
      { path: "/moive", component: moive },
      { path: "/space", component: space },

    ]
  },










  


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
