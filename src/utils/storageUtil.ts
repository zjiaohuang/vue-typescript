function obj2str(val: any): string {
  return typeof val === 'object' ? JSON.stringify(val) : val
}

function str2obj(val: string | null): any {
  if (val && val.length > 0) {
    if (val.startsWith('[') || val.startsWith('{')) {
      try {
        val = JSON.parse(val)
      } catch (error) {
        console.warn('从存储中获取数据转换成JSON异常，数据为:' + val, error)
      }
    }
    return val
  } else {
    return null
  }
}

interface IStorageUtil {
  /**
   * 保存localstorage
   * @param {localKey} key 取值参见types/global.d.ts
   * @param {*} val
   * @param {boolean} [encrypt]
   * @memberof storageUtil
   */
  localSet(key: localKey, val: any, encrypt?: boolean): void,
  /**
   * 从localstorage获取值
   * @param {string} key
   * @returns
   */
  localGet(key: localKey): any | string | null,
  /**
   * 保存值到sessionstorage
   * @param {string} key 存储key
   * @param {*} val 存储值
   * @param {boolean} [encrypt=false] 是否加密
   */
  sessionSet(key: sessionKey, val: any, encrypt?: boolean): void,
  /**
   * 从sessionstorage获取值
   * @param {string} key
   * @returns
   */
  sessionGet(key: sessionKey): any | string | null,

  sessionRemove(key: sessionKey): void
}

const storageUtil: IStorageUtil = {
  localSet(key: localKey, val: any, encrypt: boolean = false): void {
    if (encrypt) {
      val = {
        isEncrypt: true,
        data: val
      }
    }
    localStorage.setItem(key, obj2str(val))
  },
  localGet(key: localKey): any | string | null {
    let val: any | string | null = localStorage.getItem(key)
    val = str2obj(val)
    if (val.isEncrypt) {
      return val.data
    } else {
      return val
    }
  },
  sessionSet(key: sessionKey, val: any, encrypt: boolean = false) {
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
  sessionGet(key: sessionKey) {
    let val: any | string | null = sessionStorage.getItem(key)
    val = str2obj(val)
    if (val && val.isEncrypt) {
      return val.data
    } else {
      return val
    }
  },
  sessionRemove(key: sessionKey) {
    sessionStorage.removeItem(key)
  }
}

export default storageUtil
