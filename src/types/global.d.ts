// 声明全局的 window ，不然使用 window.XX 时会报错
// declare var window: Window
declare var document: Document

declare type DeviceType = 'Mobile' | 'Desktop'

// localstorage存储数据key
declare type localKey = '1' | '2'

// sessionstorage存储key
declare type sessionKey =
  // token存储key
  'token' |
  // 用户信息存储key
  'userInfo' |
  // 存储用户菜单
  'menus'
