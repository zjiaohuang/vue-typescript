import Vue from 'vue'
// 定义全局声明
declare global {
  // window声明事件总线属性
  interface Window {
    eventBus: Vue,
    /**
     * 富文本编辑器
     */
    tinymce: any,
    /**
     * padjs页数变化回调函数
     */
    pdfPageChange: ((currentPageNum: number, totalPageNum: number) => void)
  }
}
