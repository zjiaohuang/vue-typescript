import storageUtil from '@/utils/storageUtil'
import { IRootState } from './storeModel'

const getters = {
  sidebar: (state: IRootState) => state.app.sidebar,
  size: (state: IRootState) => state.app.size,
  device: (state: IRootState) => state.app.device,
  token: (state: IRootState): string => {
    const token = state.user.token
    if (!token || token === '') {
      return storageUtil.sessionGet('token')
    } else {
      return token
    }
  },
  name: (state: IRootState) => state.user.userInfo.name,
  errorLogs: (state: IRootState) => state.errorLog.logs,
  menus: (state: IRootState) => state.user.menus
}
export default getters
