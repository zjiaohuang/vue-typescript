import Mock from 'mockjs'

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 400'
})

Mock.mock('/menus', () => {
  return {
    code: 200,
    data: [{
      id: '1',
      name: '首页',
      iconType: 'icon',
      icon: 'el-icon-menu',
      path: '/'
    },
    {
      id: '2',
      name: '测试',
      children: [
        {
          id: '3',
          name: '首页',
          path: '/demo/404'
        }
      ]
    }]
  }
})
