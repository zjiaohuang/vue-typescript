export default [{
  path: 'buildForm',
  name: 'buildForm',
  component: () => import(/* webpackChunkName: "404" */'@/views/tools/build/buildForm.vue'),
  meta: { title: '用户管理' }
}]
