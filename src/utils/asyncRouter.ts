import Layout from '@/layout/index.vue'
import { IAppRouter } from '@/api/user/menus'

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 */
export const filterAsyncRouter = (routers: Array<IAppRouter>) => {
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view: string) => {
  return () => import(`@/views/${view}`)
}
