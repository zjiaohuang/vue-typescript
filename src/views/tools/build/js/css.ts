const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}'
}

function addCss(cssList:any, el:any) {
  const css = styles[el.__config__.tag]
  css && cssList.indexOf(css) === -1 && cssList.push(css)
  if (el.__config__.children) {
    el.__config__.children.forEach((el2:any) => addCss(cssList, el2))
  }
}

export function makeUpCss(conf:any) {
  const cssList:Array<any> = []
  conf.fields.forEach((el:any) => addCss(cssList, el))
  return cssList.join('\n')
}
