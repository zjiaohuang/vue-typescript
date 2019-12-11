import Vue from 'vue'
import { MyPromise } from '@/api/BaseRequestResult'

/**
 * 测试VO
 */
interface TestVo {
  /**
   * 姓名
   */
  name: string
  age: string
}

interface TestDto {
  xx: string | null
}

export function reqFun(component: Vue, param: TestDto): MyPromise<TestVo> {
  return component.$http.get<TestVo>('/test/queryById?id=111', param, null)
}
