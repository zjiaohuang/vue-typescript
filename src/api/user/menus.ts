import Vue from 'vue'
import { MyPromise } from '@/api/BaseRequestResult'

interface Menus {

}

interface TestDto {
  xx?: string
}

export function reqMenusFun(component: Vue, param: TestDto = {}): MyPromise<Menus> {
  return component.$http.post<Menus>('/menus', param, null)
}
