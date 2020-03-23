import { request } from '@/plugins/MyAxios'
import { MyPromise } from '../BaseRequestResult'

interface DictVo {
  /**
   * 主键
   */
  id: string | number,
  /**
   * 字典名
   */
  label: string,
  /**
   * 字典值
   */
  value: string | number
}

interface DictVos {
  [key: string]: DictVo[]
}

/**
 * 获取指定字典
 */
export function dictDetailFun(dictNames: string[]): MyPromise<DictVos> {
  return request.post('/dict/dictDetailMap', { dictNames }, {})
}
