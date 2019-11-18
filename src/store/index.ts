import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

interface modeulesI {
  [key: string]: any
}

const defaultModules: modeulesI = {}

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules: modeulesI = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, defaultModules)

export default new Vuex.Store({
  modules,
  getters
})
