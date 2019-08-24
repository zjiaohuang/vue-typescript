/**
 * 网络请求结果基类
 */
export class BaseRequestResult<T> {
  public static STATUS_CODE_ERROR: number = -1
  public static STATUS_CODE_DEFAULT: number = 0

  result!: T
  code: number = BaseRequestResult.STATUS_CODE_DEFAULT
  constructor(private success: boolean, private resultJson: unknown) {
    this.success = success
    this.result = <T>resultJson
  }

  public isSuccess(): boolean {
    return this.success
  }
}
