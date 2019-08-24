import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
    }, {
      path: '/example',
      name: 'example',
      component: () => import(/* webpackChunkName: "example" */ '../views/example/index.vue')
    }
  ]
})

export default router
