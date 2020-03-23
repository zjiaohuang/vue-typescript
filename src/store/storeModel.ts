import { IAppRouter } from '@/api/user/menus'
import { IUserInfo } from '@/api/user/login'

/**
 * 根状态接口
 */
export declare interface IRootState {
  /**
   * 系统状态
   */
  app:IAppState,
  /**
   * 配置状态
   */
  settings:ISettingsState,
  /**
   * 用户状态
   */
  user:IUserState,
  /**
   * 错误信息状态
   */
  errorLog:IErrorState
}

/**
 * 各模块状态接口
 */
export declare interface IModuleState {

}

export declare interface IAppState extends IModuleState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: 'medium' | 'small'
}

// 设置模块
export declare interface ISettingsState extends IModuleState {
  showSettings: boolean,
  tagsView: boolean,
  fixedHeader: boolean
}

/**
 * 用户信息模块状态
 */
export declare interface IUserState extends IModuleState {
  /**
   * token信息
   */
  token: string,
  /**
   *  用户信息
   */
  userInfo: IUserInfo,
  /**
   * 菜单信息
   */
  menus?: Array<IAppRouter>
}

/**
 * 错误日志状态
 */
export declare interface IErrorState extends IModuleState {
  logs: Array<any>
}
