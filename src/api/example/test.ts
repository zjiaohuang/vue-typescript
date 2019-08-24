import Vue from 'vue'
import { BaseRequestResult } from '../BaseRequestResult'
import { AxiosPromise } from 'axios'

/**
 * 测试VO
 */
export interface TestVo {
  /**
   * 姓名
   */
  name: string
  age: string
}

export interface TestDto {
  xx: string | null
}

export function reqFun(component: Vue, param: TestDto): AxiosPromise<BaseRequestResult<TestVo>> {
  return component.$http.get<BaseRequestResult<TestVo>>('/test/queryById?id=111', param, null)
}
