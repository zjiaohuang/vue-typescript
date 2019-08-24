import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './vuex/store'

import './plugins/ElementUI'
import Navigation from 'vue-navigation'
import myAxios from './plugins/MyAxios'

Vue.config.productionTip = false

Vue.use(myAxios)
Vue.use(Navigation, {
  router,
  store,
  keyName: '_'
})

Vue.mixin({
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back(n = -1) {
      this.$router.go(n)
    },
    replace(url) {
      this.$router.replace(url)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
