const plugins = [
  [
    'component',
    {
      'libraryName': 'element-ui',
      'styleLibraryName': 'theme-chalk'
    }
  ]
]
console.log(process.env.VUE_APP_ENV)
// 如果是生产环境移除console打印
if (typeof (process.env.VUE_APP_ENV) !== 'undefined' && process.env.VUE_APP_ENV === 'prd') {
  plugins.push('transform-remove-console')
}

module.exports = {
  'presets': [
    '@vue/app'
  ],
  plugins
}
