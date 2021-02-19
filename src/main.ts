import Vue from 'vue'
import Navigation from 'vue-navigation'
import { RawLocation } from 'vue-router'

import App from './App.vue'
import router from './routers'
import store from './store'
import myAxios from './plugins/MyAxios'

import * as directives from '@/directives'

import './utils/error-log'
import './api/mock/index'

// import './plugins/ElementUI'
import Element from 'element-ui'

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.use(myAxios)
Vue.use(Navigation, {
  router,
  store,
  keyName: '_'
})

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    doPush(url: RawLocation) {
      this.$router.push(url).catch(() => {

      })
    },
    doBack(n: number = -1) {
      this.$router.go(n)
    },
    doReplace(url: RawLocation) {
      this.$router.replace(url).catch(() => {

      })
    }
  }
})

// 接收处理全局事件使用
window.eventBus = new Vue()

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window['vm'] = vm
