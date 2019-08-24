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

  configureWebpack: {
    devtool: 'source-map', // 保证源码正确加载
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin()
      ]
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
      .set('~', resolve('public'))
    // .set('myui', resolve('src/common/components'))

    // 替换svg规则loader,老规则只有file-loader,修改为如果小于4k放到js里面
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('url-loader')
      .loader('url-loader')
      .options(genUrlLoaderOptions('img'))

    config.when(process.env.NODE_ENV !== 'development',
      config => {
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
              // ,vueClassComponent: {
              //   name: 'chunk-class-component',
              //   priority: 1,
              //   test: /[\\/]node_modules[\\/]_?vue-class-component(.*)/,
              //   enforce: true,
              //   chunks: 'all'
              // }
            }
          })
        // config.optimization.runtimeChunk('multiple')
      }
    )
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          // 所有vue页面可以直接使用theme.styl变量
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
