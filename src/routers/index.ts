import Vue from 'vue'
import Router, { Route } from 'vue-router'

import Layout from '../layout/index.vue'
import intercept from './intercept'

import routerMap from './routerMap'

routerMap.Layout = Layout
routerMap['404'] = () => import(/* webpackChunkName: "404" */ '../views/404.vue')

Vue.use(Router)

const router = new Router({
  scrollBehavior: (to: Route, from: Route) => ({ x: 0, y: 0 }),
  routes: [{
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }, {
      path: 'pdf',
      name: 'pdf',
      component: () => import('@/views/example/pdf.vue'),
      meta: { title: 'pdf' }
    }, {
      path: 'cropperDemo',
      name: 'cropperDemo',
      component: () => import('@/views/example/cropper.vue'),
      meta: { title: 'cropperDemo' }
    }]
  }, {
    path: '/demo',
    component: Layout,
    meta: { title: '异常' }
  }]
})

router.beforeEach(intercept.routerBeforeEach)
router.afterEach(intercept.routerAfterEach)

export default router
