import Vue from 'vue'
import { MyPromise } from '@/api/BaseRequestResult'

interface Menus {

}

interface TestDto {
  xx?: string
}

/**
 * 查询服务端菜单配置
 *
 * @export
 * @param {Vue} component
 * @param {TestDto} [param={}]
 * @returns {MyPromise<Menus>}
 */
export function reqMenusFun(component: Vue, param: TestDto = {}): MyPromise<Array<Menus>> {
  return component.$http.post<Array<Menus>>('/menus', param, null)
}
