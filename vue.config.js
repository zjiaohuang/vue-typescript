const path = require('path')
const days = require('dayjs')
// 生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
// const assetsDir = './static'

const resolve = dir => {
  return path.join(__dirname, dir)
}

const genUrlLoaderOptions = dir => {
  return {
    limit: 4096,
    fallback: {
      loader: 'file-loader',
      options: {
        name: `${dir}/[name].[hash:8].[ext]`
      }
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const cdn = {
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'
  ]
}

// vue-cli3指南             https://cli.vuejs.org/zh/guide/
// webpack-chain的API地址   https://github.com/neutrinojs/webpack-chain#getting-started
// vue-cli3配置源码         https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config
// 查看当前webpack配置  vue inspect > output.js
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  publicPath: './',
  // assetsDir: assetsDir,
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,

  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
      }
    }
  },

  chainWebpack: config => {
    // 增加编译时间环境变量
    config.plugin('define').tap(args => {
      console.log(process.env.VUE_APP_BASE_URL)
      args[0].VUE_APP_BUILD_TIME = '"' + days().format('YYYYMMDDHHmmss') + '"'

      if (args[0]['process.env'].VUE_APP_ENV) {
        console.log('\n*************************************')
        console.log(`******* 请确认正在打包 ${args[0]['process.env'].VUE_APP_ENV} ********`)
      }
      return args
    })

    // 取消网络空闲预加载资源功能
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 设置路径别名
    config.resolve.alias
      .set('@', path.resolve('src'))
    // .set('myui', resolve('src/common/components'))

    // 替换svg规则loader,老规则只有file-loader,修改为如果小于4k放到js里面
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('url-loader')
      .loader('url-loader')
      .options(genUrlLoaderOptions('img'))

    // https://webpack.js.org/configuration/devtool/#development
    // config.when(process.env.NODE_ENV === 'development',
    //   config => config.devtool('cheap-module-source-map')
    // )

    config.when(process.env.NODE_ENV !== 'development',
      config => {
        // 将运行时js放到html中，每次新增功能运行时js都会变化,有效增加app.js缓存
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()

        // 配置打包分割策略
        config
          .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs', // 打包第三方依赖
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial'
              },
              elementUI: {
                name: 'chunk-elementUI', // elementui单独打包
                priority: 20,
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                chunks: 'initial'
              }
            }
          })

        // 配置将运行时manifest单独提取到一个js中，配合script-ext-html-webpack-plugin将manifest
        config.optimization.runtimeChunk('single')

        // 将cdn链接放到htmlplugin配置中
        config.plugin('html')
          .tap(args => {
            args[0].cdn = cdn
            return args
          })
      }
    )
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          // 所有vue页面可以直接使用theme.styl变量
          '~@/assets/stylus/variables.styl'
        ]
      }
    }
  },

  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/test': {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true
      }
    }
  },

  lintOnSave: true
}
