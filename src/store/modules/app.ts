import { Module, MutationTree, ActionTree } from 'vuex'
import { DeviceType, IAppState, IRootState } from '../moduleType'

export const TOGGLE_SIDEBAR: string = 'TOGGLE_SIDEBAR'
export const CLOSE_SIDEBAR: string = 'CLOSE_SIDEBAR'
export const TOGGLE_DEVICE: string = 'TOGGLE_DEVICE'
export const SET_SIZE: string = 'SET_SIZE'

const state: IAppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: true,
    withoutAnimation: true
  },
  language: 'zh',
  size: 'medium'
}

const mutations: MutationTree<IAppState> = {
  [TOGGLE_SIDEBAR]: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', '1')
    } else {
      localStorage.setItem('sidebarStatus', '0')
    }
  },
  [CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [TOGGLE_DEVICE]: (state, device) => {
    state.device = device
  },
  [SET_SIZE]: (state, size) => {
    state.size = size
    localStorage.setItem('size', size)
  }
}

const actions: ActionTree<IAppState, IRootState> = {
  toggleSideBar({ commit }) {
    commit(TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(CLOSE_SIDEBAR, withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit(TOGGLE_DEVICE, device)
  },
  setSize({ commit }, size) {
    commit(SET_SIZE, size)
  }
}

const app: Module<IAppState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default app
