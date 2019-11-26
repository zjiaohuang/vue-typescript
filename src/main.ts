import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'

// import './plugins/ElementUI'
import Element from 'element-ui'
import Navigation from 'vue-navigation'
import myAxios from './plugins/MyAxios'

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
    go(url) {
      this.$router.push(url)
    },
    back(n = -1) {
      this.$router.go(n)
    },
    doReplace(url) {
      this.$router.replace(url)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
