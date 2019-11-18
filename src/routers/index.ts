import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index.vue'

Vue.use(Router)

const router = new Router({
  scrollBehavior: (to, from) => ({ x: 0, y: 0 }),
  routes: [{
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }, {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }, {
    path: '/',
    component: Layout
  }]
})

export default router
