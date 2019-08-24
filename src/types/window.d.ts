import Vue from 'vue'
// 定义全局声明
declare global {
  // window声明事件总线属性
  interface Window {
    eventBus: Vue
  }
}
