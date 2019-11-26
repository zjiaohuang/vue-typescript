import Vue from 'vue'
import Vuex from 'vuex'

import { requireModels } from '@/utils/requireModules'
import getters from './getters'

Vue.use(Vuex)

// 加载modules目录下状态模块
const modules = requireModels(require.context('./modules', true, /\.ts$/))

export default new Vuex.Store({
  modules,
  getters
})
