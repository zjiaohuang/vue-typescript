import { request } from '@/plugins/MyAxios'
import { MyPromise } from '../BaseRequestResult'

/**
* 后台定义菜单类型
*/
export interface IAppRouter {
 name: string,
 path: string,
 meta?: {
   icon?: string
   title: string,
   cache?: boolean
 },
 children?: Array<IAppRouter>,
 component: string | any
}

export interface Menus extends IAppRouter {
  id: string
}

interface UserMenuDto {
  platform?: 'app' | 'web' | 'pad' | 'admin'
}

/**
 * 查询用户做实用平台菜单配置
 * @param {UserMenuDto} [param={}]
 * @returns {MyPromise<Array<Menus>>}
 */
export function reqMenusFun(param: UserMenuDto = { platform: 'admin' }): MyPromise<Menus[]> {
  return request.post<Array<Menus>>('/user/menus', param, null)
}
