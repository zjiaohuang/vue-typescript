import Mock from 'mockjs'

// 用户菜单
require('./menus')

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '2500'
})
