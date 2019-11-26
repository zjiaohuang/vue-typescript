interface ILocalKey { [key: string]: string }
interface ISeesinKey {
  token: string
}

/***
 * localstorage存储key
 */
const LOCL_KEY: ILocalKey = {

}

/**
 * sessionstorage存储key
 */
const SESSION_KEY: ISeesinKey = {
  token: 'token'
}

function obj2str(val: any): string {
  return typeof val === 'object' ? JSON.stringify(val) : val
}

function str2obj(val: string | null): any {
  if (val && val.length > 0) {
    try {
      val = JSON.parse(val)
    } catch (error) {
      console.warn('从存储中获取数据转换成JSON异常，数据为:' + val, error)
    }
    return val
  } else {
    return null
  }
}

interface storageUtil {
  /**
   * localstorage存储key
   */
  LOCL_KEY: ILocalKey,
  /**
   * sessionstorage存储key
   */
  SESSION_KEY: ISeesinKey,
  /**
   * 保存localstorage
   * @param {string} key 存储key
   * @param {*} val 存储值
   * @param {boolean} [encrypt=false] 是否加密
   */
  localSet(key: string, val: any, encrypt?: boolean): void,
  /**
   * 从localstorage获取值
   * @param {string} key
   * @returns
   */
  localGet(key: string): any | string | null,
  /**
   * 保存值到sessionstorage
   * @param {string} key 存储key
   * @param {*} val 存储值
   * @param {boolean} [encrypt=false] 是否加密
   */
  sessionSet(key: string, val: any, encrypt?: boolean): void,
  /**
   * 从sessionstorage获取值
   * @param {string} key
   * @returns
   */
  sessionGet(key: string): any | string | null,

  sessionRemove(key: string): void
}

const storageUtil: storageUtil = {
  LOCL_KEY,
  SESSION_KEY,
  localSet(key: string, val: any, encrypt: boolean = false): void {
    if (encrypt) {
      val = {
        isEncrypt: true,
        data: val
      }
    }
    localStorage.setItem(key, obj2str(val))
  },
  localGet(key: string): any | string | null {
    let val: any | string | null = localStorage.getItem(key)
    val = str2obj(val)
    if (val.isEncrypt) {
      return val.data
    } else {
      return val
    }
  },
  /**
   * 保存localstorage
   * @param {string} key 存储key
   * @param {*} val 存储值
   * @param {boolean} [encrypt=false] 是否加密
   */
  sessionSet(key: string, val: any, encrypt: boolean = false) {
    if (!val) {
      sessionStorage.removeItem(key)
      return
    }
    if (encrypt) {
      val = {
        isEncrypt: true,
        data: val
      }
    }
    sessionStorage.setItem(key, obj2str(val))
  },

  /**
   * 从localstorage获取值
   * @param {string} key
   * @returns
   */
  sessionGet(key: string) {
    let val: any | string | null = sessionStorage.getItem(key)
    val = str2obj(val)
    if (val && val.isEncrypt) {
      return val.data
    } else {
      return val
    }
  },

  sessionRemove(key: string) {
    sessionStorage.removeItem(key)
  }
}

export default storageUtil
