import { Module } from 'vuex'

/**
 * 根状态接口
 */
export interface IRootState {

}

/**
 * 各模块状态接口
 */
export interface IModuleState {

}

/**
 * 重定义模块接口，为动态加载模块状态使用
 */
export interface MyModule<T extends IModuleState, IRootState> extends Module<IModuleState, IRootState> {

}

/**
 * 模块存储数据定义
 */
export interface IModules<T extends Module<IModuleState, IRootState>> {
  [key: string]: T
}

// app模块
export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState extends IModuleState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

// 设置模块
export interface ISettingsState extends IModuleState {
  showSettings: boolean,
  tagsView: boolean,
  fixedHeader: boolean
}

// 用户信息模块状态
export interface IUserState extends IModuleState {
  token: string,
  userInfo: any
}
