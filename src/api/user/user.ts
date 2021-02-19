import { request } from '@/plugins/MyAxios'
import { MyPromise } from '../BaseRequestResult'

/**
 * 新增用户
 */
export function add(user: any): MyPromise<any> {
  return request.post<any>('/user/add', user, null)
}

/**
 * 编辑用户
 */
export function edit(user: any): MyPromise<any> {
  return request.post<any>('/user/edit', user, null)
}

/**
 * 删除用户
 */
export function del(ids: any): MyPromise<any> {
  return request.post<any>('/user/delete', { ids }, null)
}

/**
 * 获取用户
 */
export function get(id: any): MyPromise<any> {
  return request.post<any>('/user/get', { id }, null)
}

/**
 * 查询用户列表
 */
export function query(param: any): MyPromise<any> {
  return request.post<any>('/user/query', param, null)
}

export default { query, get, del, edit, add }
