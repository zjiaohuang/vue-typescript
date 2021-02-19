export default [{
  path: 'userList',
  name: 'userList',
  component: () => import('@/views/system/user/userList.vue'),
  meta: { title: '用户管理' }
}, {
  path: 'roleList',
  name: 'roleList',
  component: () => import('@/views/system/role/roleList.vue'),
  meta: { title: '角色管理' }
}]
