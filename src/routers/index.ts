import Vue from 'vue'
import Router, { Route } from 'vue-router'

import Layout from '../layout/index.vue'
import intercept from './intercept'

import demo from './modules/demo'
import system from './modules/system'

Vue.use(Router)

const router = new Router({
  scrollBehavior: (to: Route, from: Route, savedPosition) => {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      // 判断是否需要异步查询数据后滚动到指定位置
      if (to.meta.useAsynPositionFrom && to.meta.useAsynPositionFrom.indexOf(from.path) !== -1) {
        return new Promise((resolve, reject) => {
          window.eventBus.$on('ajax.response.complete', function () {
            window.eventBus.$off('ajax.response.complete')
            setTimeout(() => {
              resolve(savedPosition)
            }, 100)
          })
        })
      } else {
        return savedPosition
      }
    } else {
      // 如果不是通过上述行为切换组件，就会让页面回到顶部
      return { x: 0, y: 0 }
    }
  },
  routes: [{
    path: '/login',
    component: () => import('../views/login/index.vue')
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }, {
    path: '/demo',
    component: Layout,
    meta: { title: '例子' },
    children: [
      ...demo
    ]
  }, {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理' },
    children: [
      ...system
    ]
  }]
})

router.beforeEach(intercept.routerBeforeEach)
router.afterEach(intercept.routerAfterEach)

export default router
