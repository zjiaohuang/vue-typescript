
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// TODO 如果vue-navigation有typescript声明移除这个声明
declare module 'vue-navigation'
declare module 'nprogress'
declare module 'lrz'
declare module 'mockjs'
declare module 'crypto-js/rc4'
declare module 'crypto-js/enc-utf8'

// v-charts折线
declare module 'v-charts/lib/line.common'
// v-histogram
declare module 'v-charts/lib/histogram.common'
