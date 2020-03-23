import { Module, MutationTree, ActionTree } from 'vuex'
import { IErrorState, IRootState } from '../storeModel'

const state:IErrorState = {
  logs: []
}

const mutations: MutationTree<IErrorState> = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

const actions: ActionTree<IErrorState, IRootState> = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

const errorLog: Module<IErrorState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default errorLog
