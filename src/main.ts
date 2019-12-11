import Vue from 'vue'
import Navigation from 'vue-navigation'
import { RawLocation } from 'vue-router'

import App from './App.vue'
import router from './routers'
import store from './store'
import myAxios from './plugins/MyAxios'

import './utils/error-log'

// import './plugins/ElementUI'
import Element from 'element-ui'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.use(myAxios)
Vue.use(Navigation, {
  router,
  store,
  keyName: '_'
})

Vue.mixin({
  methods: {
    doPush(url: RawLocation) {
      // this.$router.push(url).catch(() => {

      // })
      this.$router.push(url)
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
