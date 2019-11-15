import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  scrollBehavior: (to, from) => ({ x: 0, y: 0 }),
  routes: [{
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }, {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }
  ]
})

export default router
