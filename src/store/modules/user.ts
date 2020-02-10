import { Module, MutationTree, ActionTree } from 'vuex'
import { IUserState, IRootState } from '../moduleType'

import storageUtil from '@/utils/storageUtil'

export const SET_TOKEN: string = 'SET_TOKEN'

const state: IUserState = {
  token: '',
  userInfo: {
    name: ''
  },
  menus: []
}

const mutations: MutationTree<IUserState> = {
  [SET_TOKEN]: (state, token: string) => {
    state.token = token
    storageUtil.sessionSet('token', token)
  },
  setMenus: (state, menus: Array<any>) => {
    state.menus = menus
  }
}

const actions: ActionTree<IUserState, IRootState> = {
  setToken({ commit, state, dispatch }, token: string) {
    commit(SET_TOKEN, token)
  },
  logout({ commit, state, dispatch }) {
    // TODO 调用退出接口后清除state
    commit(SET_TOKEN, null)
  },
  setMenus({ commit, state, dispatch }, menus: Array<any>) {
    commit('setMenus', menus)
  }
}

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user
