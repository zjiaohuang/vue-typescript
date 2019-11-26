import { Module, MutationTree, ActionTree } from 'vuex'
import { MyModule, ISettingsState, IRootState } from '../moduleType'

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
