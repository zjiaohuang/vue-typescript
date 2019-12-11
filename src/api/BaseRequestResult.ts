import { AxiosPromise } from 'axios'

/**
 * 封装AxiosPromise，指定AxiosPromise泛型为BaseRequestResult<T>
 * @extends {AxiosPromise<BaseRequestResult<T>>}
 * @template T 请求返回VO对象
 */
export interface MyPromise<T = any> extends AxiosPromise<BaseRequestResult<T>> {

}

/**
 * 网络请求结果基类
 */
export class BaseRequestResult<T = any> {
  public static STATUS_CODE_ERROR: number = -1
  public static STATUS_CODE_DEFAULT: number = 0

  /**
   * ajax返回数据
   */
  result!: T
  code: number = BaseRequestResult.STATUS_CODE_DEFAULT

  /**
   * 创建网络请求结果基类
   * @param {boolean} success
   * @param {unknown} resultJson
   * @memberof BaseRequestResult
   */
  constructor(private success: boolean, private resultJson: unknown) {
    this.success = success
    this.result = <T>resultJson
  }

  public isSuccess(): boolean {
    return this.success
  }
}
