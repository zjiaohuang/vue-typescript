# app-pc

## 免费CDN
-  https://www.bootcdn.cn/
- https://cdn.jsdelivr.net/

### vue各个版本区别

| UMD                           | CommonJS           | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) |                        |
| :---------------------------- | :----------------- | :--------------------------- | :------------------------- | ---------------------- |
| **完整版**                    | vue.js             | vue.common.js                | vue.esm.js                 | vue.esm.browser.js     |
| **只包含运行时版**            | vue.runtime.js     | vue.runtime.common.js        | vue.runtime.esm.js         | -                      |
| **完整版(生产环境)**          | vue.min.js         | -                            | -                          | vue.esm.browser.min.js |
| **只包含运行时版(生产环境)**   | vue.runtime.min.js | -                            | -                          | -                      |

### 术语

- **完整版**：同时包含编译器和运行时的版本。
- **编译器**：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
- **运行时**：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。
- **UMD**：UMD 版本可以通过 `<script>` 标签直接用在浏览器中。jsDelivr CDN 的 https://cdn.jsdelivr.net/npm/vue 默认文件就是运行时 + 编译器的 UMD 版本 (`vue.js`)。
- **CommonJS**：CommonJS 版本用来配合老的打包工具比如 [Browserify](http://browserify.org/) 或 [webpack 1](https://webpack.github.io/)。这些打包工具的默认文件 (`pkg.main`) 是只包含运行时的 CommonJS 版本 (`vue.runtime.common.js`)。
- **ES Module**：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：
  - 为打包工具提供的 ESM：为诸如 [webpack 2](https://webpack.js.org/) 或 [Rollup](https://rollupjs.org/) 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (`pkg.module`) 是只有运行时的 ES Module 构建 (`vue.runtime.esm.js`)。
  
  - 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module">` 直接导入。
  

## 目录结构

> `@/`代表是`src/`
```
├── dist                       # 编译后静态文件
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── layout                 # 全局 layout
│   ├── routers                # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── shims-vue.d.ts         # vue的typescript声明
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 布局
页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等
### Layout
> 对应代码
> @/layout

### app-main
> 对应代码
> @/layout/components/AppMain.vue

### router-view

**不同的 router 有时会对应着相同的 component**，默认情况下这两个页面切换时并不会触发 vue 的 created 或者 mounted 钩子。<font color=red>`router-view` 上加上一个唯一的 key</font>，来保证路由切换时都会重新渲染触发钩子了。

```html
<router-view :key="key" />
```

```javascript
get key() {
  // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
  return this.$route.path
}
```

## 新增页面
### 用户代码片段
```json
	"vueTs":{
		"prefix": "_vueTs",
		"body": [
			"<template>",
			"  <div>",
			"  </div>",
			"</template>",
			"",
			"<script lang=\"ts\">",
			"import { Component, Vue } from 'vue-property-decorator'",
			"",
			"@Component",
			"export default class $1 extends Vue {",
			"  created() { }",
			"}",
			"</script>",
			"",
			"<style lang=\"stylus\"></style>",
			""
		]
	}
```

### 新增view

在 `@/views` 文件下 创建对应的文件夹，一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个`utils`或`components`文件夹，各个功能模块维护自己的`utils`或`components`组件



### 新增路由

路由都由前端配置，后台不配置前端路由

> 模块路由组件使用Layout
>
> 菜单路由组件使用实际新增view页面

```javascript
{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "login" */ '@/views/dashboard/index.vue'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
}
```



### 新增API

在 [@/api](./src/api) 文件夹下创建本模块对应的 api 服务



### 新增组件

全局的 `@/components` 只会写一些全局的组件，如富文本，各种搜索组件，封装的日期组件等等能被公用的组件。每个页面或者模块特定的业务组件则会写在当前 views 下面。如：`@/views/article/components/xxx.vue`



## 样式

### 混入

本项目已自动配置`variables.styl`和`mixin.styl`混入到每个vue页面和组件，无需重复引入



### 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>`或`/deep/` 来实现。



## Ajax请求

为了方便管理维护，统一的请求处理都放在 `@/src/api` 文件夹中，并且一般按照 model 纬度进行拆分文件夹

```
├── api                        # 源代码
│   ├── model1                 # 所有请求
│   ├── model2                 # 主题 字体等静态资源
│   ├── ......                 # 全局公用组件
│   └── BaseRequestResult.ts   # 网络请求结果基类和重定义promise泛型
```



### MyAxios.ts

基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。



### BaseRequestResult.ts

对请求返回信息的统一定义和请求promise泛型定义，方便ide对服务端返回信息代码提示。

```typescript
/**
 * 封装AxiosPromise，指定AxiosPromise泛型为BaseRequestResult<T>
 * @extends {AxiosPromise<BaseRequestResult<T>>}
 * @template T 请求返回VO对象
 */
export interface MyPromise<T = any> extends AxiosPromise<BaseRequestResult<T>> {

}

/**
 * 网络请求结果基类
 */
export class BaseRequestResult<T = any> {
  public static STATUS_CODE_ERROR: number = -1
  public static STATUS_CODE_DEFAULT: number = 0

  /**
   * ajax返回数据
   */
  result!: T
  code: number = BaseRequestResult.STATUS_CODE_DEFAULT

  /**
   * 创建网络请求结果基类
   * @param {boolean} success
   * @param {unknown} resultJson
   * @memberof BaseRequestResult
   */
  constructor(private success: boolean, private resultJson: unknown) {
    this.success = success
    this.result = <T>resultJson
  }

  public isSuccess(): boolean {
    return this.success
  }
}
```

### 请求例子

每个请求必须先定义vo和dto，并对每个属性进行注释方便后续人员运维

```typescript
// api/example/test.js
import Vue from 'vue'
import { MyPromise } from '@/api/BaseRequestResult'
/**
 * 返回VO
 */
interface TestVo {
  /**
   * 姓名
   */
  name: string
  /**
  年龄
  */
  age: string
}
/***
* 请求DTO
*/
interface TestDto {
  xx: string | null
}
/***
* 请求函数
*/
export function reqFun(component: Vue, param: TestDto): MyPromise<TestVo> {
  return component.$http.get<TestVo>('/test/queryById?id=111', param, null)
}

// views/example
import { reqFun } from '@/api/example/test'
@Component
export default class ExampleIndex extends Vue {
  created() {
    reqFun(this, { xx: null })
      .then(response => {
        console.log(response.data.result.name)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
```

### 设置baseURL

可以通过[环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)设置`baseURL`，从而请求服务端的 api 地址

> <font color=red>**本地调试需要修改baseURL不要直接修改对应环境环境文件**</font>，增加.env[.model].local文件修改对应的key，并且.local文件不准提交版本。

```properties
# .env
VUE_APP_BASE_API = '/dev-api' #注入服务 api 的根路径
```

axios实例使用baseURL

```typescript
let axiosDefualtOpts:AxiosRequestConfig = {
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  timeout: 50000,
  baseURL: process.env.BASE_API,
  transformRequest: [
  	function (data: JSON) {
    	return 'JSON=' + JSON.stringify(data)
  }],
  ...option
}
const service: AxiosInstance = axios.create(axiosDefualtOpts))
```

或者单个请求覆盖

```typescript
export function reqFun(component: Vue, param: TestDto): MyPromise<TestVo> {
  return component.$http.get<TestVo>('/test/queryById?id=111', param, {
      baseURL:
  })
}
```



## 数据存储

### VUEX

数据存入vuex前先判断是否需要存入，不能一股脑任何数据都往vuex中放

#### 存入理由

- 多个（独立）组件来说必须是可访问的
- 集中的API/数据获取逻辑

#### 替代方案

- 向下传递的props
- 祖先组件向所有子孙组件传递数据provide/inject

### sessionStorage和localstorage

#### storageUtil.ts

sessionStorage和localStrorage工具类，增加信息加密存储方法。

> 存储key在@/types/global.d.ts中定义的混合类型，如果需要新增存储key需要先再global.d.ts中增加定义类型再使用

global.d.ts定义key值
```typescript
// localstorage存储数据key
declare type localKey = '1' | '2'
// sessionstorage存储key
declare type sessionKey = 'key' | 'token'
```



## Typescript注意事项

### 组件递归调用