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
if (typeof (process.env.VUE_APP_ENV) !== 'undefined' && process.env.VUE_APP_ENV === 'prd') {
  plugins.push('transform-remove-console')
}

module.exports = {
  'presets': [
    '@vue/app'
  ],
  plugins
}
