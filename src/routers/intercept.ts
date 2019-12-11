import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import { Route } from 'vue-router'

// NProgress Configuration
NProgress.configure({ showSpinner: false })
// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

function routerBeforeEach(to: Route, from: Route, next: Function) {
  // start progress bar
  if (to.path !== from.path) {
    NProgress.start()
  }

  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = store.getters.token
    if (token) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: `/login?redirect=${to.path}`, replace: true })
      NProgress.done()
    }
  }
  // next()
}

function routerAfterEach() {
  // finish progress bar
  NProgress.done()
}

export default {
  routerBeforeEach,
  routerAfterEach
}
