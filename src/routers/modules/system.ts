export default [
  {
    path: 'system/userList',
    name: 'system/userList',
    component: () => import('@/views/system/user/userList.vue'),
    meta: { title: '用户管理' }
  }
]
