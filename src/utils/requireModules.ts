/**
 * 动态导入制定目录下所有文件
 * @export
 * @param {*} modulesFiles 模块下所有文件
 * @returns {*}
 */
export function requireModels(modulesFiles: any): any {
  let defaultMap: { [key: string]: any } = {}

  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  const map: { [key: string]: any } = modulesFiles.keys().reduce((map: any, modulePath: string) => {
    // set './app.ts' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    map[moduleName] = value.default
    return map
  }, defaultMap)

  return map
}
