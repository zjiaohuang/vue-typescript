import { request } from '@/plugins/MyAxios'
import { MyPromise } from '../../BaseRequestResult'

/**
 * 新增角色
 */
export function add(role: any): MyPromise<any> {
  return request.post<any>('/role/add', role, null)
}

/**
 * 编辑角色
 */
export function edit(role: any): MyPromise<any> {
  return request.post<any>('/role/edit', role, null)
}

/**
 * 删除角色
 */
export function del(ids: any): MyPromise<any> {
  return request.post<any>('/role/delete', { ids }, null)
}

/**
 * 获取角色
 */
export function get(id: any): MyPromise<any> {
  return request.post<any>('/role/get', { id }, null)
}

/**
 * 查询角色列表
 */
export function query(param: any): MyPromise<any> {
  return request.post<any>('/role/query', param, null)
}

export default { query, get, del, edit, add }
