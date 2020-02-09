import Vue from 'vue'

// 当前部署环境
export const isPrd = process.env.VUE_APP_ENV === 'prd'

// 浏览器属性判断
export const inBrowser = !Vue.prototype.$isServer || typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const root = typeof window !== 'undefined' ? window : null
