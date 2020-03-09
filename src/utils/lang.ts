import { inBrowser } from './env'

/**
 * 空函数
 */
export function noop() { }

/**
 * 字符串的hashcode
 *
 * @export
 * @param {string} str
 * @returns {number} hashcode
 */
export function hashCode(str: string): number {
  if (Array.prototype.reduce) {
    return str.split('').reduce(function (a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
  }
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    let character = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + character
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

/**
 * 异步加载js
 * @param {string} src js地址
 * @param {(...args: any[]) => void} callback js加载完成或加载失败回调函数
 */
export function requireRemoteScript(src: string, callback: (...args: any[]) => void) {
  const hashVal: string = hashCode(src) + ''
  if (document.getElementById(hashVal)) {
    callback()
    return
  }
  const doc = document
  const head = doc.head || doc.getElementsByTagName('head')[0]

  let node: HTMLScriptElement | any | null = doc.createElement('script')
  const supportOnload = 'onload' in node
  const onload = function () {
    node = null
    typeof callback === 'function' && callback()
  }

  if (supportOnload) {
    node.onload = onload
  } else {
    node.onreadystatechange = function () {
      if (/loaded|complete/.test(node.readyState)) {
        onload()
      }
    }
  }

  const supportOnError = 'onerror' in node
  const onerror = function (...args: any[]) {
    head.removeChild(node)
    node = null
    console.error(args)
    typeof callback === 'function' && callback(new Error(`加载${src}错误`))
  }
  if (supportOnError) {
    node.onerror = onerror
  }

  node.id = hashVal
  node.async = true
  node.crossOrigin = true
  node.referrerpolicy = 'origin'
  node.charset = 'utf-8'
  node.src = src
  head.appendChild(node)
}

/**
 * 获取像素比
 * @export
 * @returns
 */
export function getDpr() {
  const getParam = (name: string, str: string | null) => {
    if (str) {
      const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i')
      const r = str.match(reg)
      if (r != null) {
        return r[2]
      }
    }
    return null
  }

  const viewPort = inBrowser ? document.querySelector('meta[name=viewport]') : null

  if (!viewPort) {
    return 1
  }

  const viewPortContent: string | null = viewPort.getAttribute('content')
  const initialScale = +(getParam('initial-scale', viewPortContent) || 1)
  const maximumScale = +(getParam('maximum-scale', viewPortContent) || 1)
  const minimumScale = +(getParam('minimum-scale', viewPortContent) || 1)

  return 1 / Math.min(initialScale, maximumScale, minimumScale)
}

/**
 * 创建一个防抖函数
 * 适用场景持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
 * @example
 * function fun(msg){
 *  alert(msg)
 * }
 * let debounceFun = debounce(fun)
 * // 需要指定被节流函数this指向
 * debounceFun(this, '你好')
 */
export function debounce(fn: (...args: any[]) => any = noop, delay = 300) {
  let timer: number | null = null

  // 这个地方的this是被调用函数上下文的对象
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 创建一个节流函数
 * 续触发事件时，保证一定时间段内只调用一次事件处理函数
 * @example
 * function fun(msg){
 *  alert(msg)
 * }
 * let throttleFun = throttle(fun)
 * // 需要指定被节流函数this指向
 * throttleFun(this, '你好')
 */
export function throttle(fn: (...args: any[]) => any = noop, interval = 300) {
  let last = 0

  // 这个地方的this是被调用函数上下文的对象
  return function (this: any, ...args: any[]) {
    const now = Date.now()

    if (now - last > interval) {
      last = now
      fn.apply(this, args)
    }
  }
}
