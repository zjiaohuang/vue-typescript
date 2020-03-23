import { Module, MutationTree, ActionTree } from 'vuex'
import { ISettingsState, IRootState } from '../storeModel'

const state:ISettingsState = {
  showSettings: false,
  tagsView: false,
  fixedHeader: false
}

const settings: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state
}

export default settings
