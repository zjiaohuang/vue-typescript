import Mock from 'mockjs'
import { requireModels } from '@/utils/requireModules'

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '50-200'
})

// 加载modules目录下所有模拟数据
const modules = requireModels(require.context('./modules', true, /\.ts$/))

for (let key in modules) {
  // url路径就是文件目录路径
  Mock.mock(`/${key}`, () => {
    return {
      code: 200,
      data: modules[key]
    }
  })
}
