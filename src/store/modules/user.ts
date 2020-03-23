import { Module, MutationTree, ActionTree } from 'vuex'

import storageUtil from '@/utils/storageUtil'
import { IUserState, IRootState } from '../storeModel'
import { userLoginFun, reqUserInfoFun, UserLoginDto, IUserInfo } from '@/api/user/login'
import { reqMenusFun } from '@/api/user/menus'

export const SET_TOKEN: string = 'SET_TOKEN'
export const SET_USER_INFO: string = 'SET_USER_INFO'

const state: IUserState = {
  token: '',
  userInfo: {},
  menus: []
}

const mutations: MutationTree<IUserState> = {
  [SET_TOKEN]: (state, token: string) => {
    state.token = token
    if (token) {
      storageUtil.sessionSet('token', token)
    } else {
      storageUtil.sessionRemove('token')
    }
  },
  setMenus: (state, menus: Array<any>) => {
    state.menus = menus
  },
  [SET_USER_INFO]: (state, userInfo: IUserInfo) => {
    state.userInfo = userInfo
  }
}

const actions: ActionTree<IUserState, IRootState> = {
  setToken({ commit, state, dispatch }, token: string) {
    commit(SET_TOKEN, token)
  },
  login({ commit }, loginDto: UserLoginDto) {
    return new Promise((resolve, reject) => {
      userLoginFun(loginDto).then(res => {
        commit('SET_TOKEN', res.data.result.token)
        commit('SET_USER_INFO', res.data.result.userInfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    // TODO 调用退出接口后清除state
    commit(SET_TOKEN, null)
  },
  userInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      reqUserInfoFun().then(res => {
        commit('SET_USER_INFO', res.data.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setMenus({ commit, state, dispatch }, menus: Array<any>) {
    commit('setMenus', menus)
  },
  getMenus({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      reqMenusFun().then(res => {
        commit('setMenus', res.data.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user
