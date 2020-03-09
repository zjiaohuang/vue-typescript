export default [
  {
    path: 'pdf',
    name: 'pdf',
    component: () => import('@/views/example/pdf.vue'),
    meta: { title: 'pdf' }
  }, {
    path: 'cropperDemo',
    name: '图片裁剪',
    component: () => import('@/views/example/cropper.vue'),
    meta: { title: 'cropperDemo' }
  }, {
    path: 'clearEmojiDemo',
    name: 'clearEmojiDemo',
    component: () => import('@/views/example/clearEmojiDemo.vue'),
    meta: { title: '输入框去除表情字符' }
  }, {
    path: 'chartsDemo',
    name: 'chartsDemo',
    component: () => import('@/views/example/chartsDemo.vue'),
    meta: { title: '图表测试1' }
  }, {
    path: 'chartsDemo2',
    name: 'chartsDemo2',
    component: () => import('@/views/example/chartsDemo2.vue'),
    meta: { title: '图表测试2' }
  }
]
