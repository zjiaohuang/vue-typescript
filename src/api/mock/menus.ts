import Mock from 'mockjs'

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
      icon: 'el-icon-s-platform',
      children: [
        {
          id: '3',
          name: '首页',
          path: '/demo/404'
        }, {
          id: '4',
          name: 'pdf展示',
          path: '/demo/pdf'
        }, {
          id: '5',
          name: '图片裁剪',
          path: '/demo/cropperDemo'
        }, {
          id: '6',
          name: '去除Emoji',
          path: '/demo/clearEmojiDemo'
        }, {
          id: '7',
          name: '图表测试1',
          path: '/demo/chartsDemo'
        }, {
          id: '8',
          name: '图表测试2',
          path: '/demo/chartsDemo2'
        }
      ]
    }, {
      id: '10000',
      name: '基础配置管理',
      icon: 'el-icon-s-tools',
      children: [
        {
          id: '10001',
          name: '用户管理',
          path: '/demo/pdf1'
        }, {
          id: '10002',
          name: '菜单管理',
          path: '/demo/pdf2'
        }, {
          id: '10003',
          name: '角色管理',
          path: '/demo/pdf3'
        }
      ]
    }, {
      id: '20000',
      name: '系统监控管理',
      icon: 'el-icon-s-tools',
      children: [
        {
          id: '20001',
          name: '用户管理',
          path: '/demo/pdf4'
        }
      ]
    }]
  }
})
