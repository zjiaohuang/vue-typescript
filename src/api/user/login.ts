import { request } from '@/plugins/MyAxios'
import { MyPromise } from '../BaseRequestResult'

export interface IUserInfo {
  name?: string,
  sex?: string
}

export interface UserLoginDto {
  userName: string,
  password: string,
  code: string,
  codeId: string
}

export interface UserLoginVo {
  token: string,
  userInfo: IUserInfo
}

/**
 * 用户登录
 */
export function userLoginFun(UserLoginDto: UserLoginDto): MyPromise<UserLoginVo> {
  return request.post('/user/login', UserLoginDto, {})
}

/**
 * 登录用户信息
 */
export function reqUserInfoFun(): MyPromise<IUserInfo> {
  return request.get('/user/info', {}, { showLoading: false })
}
