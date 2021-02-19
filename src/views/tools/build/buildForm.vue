<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
        </div>
      </div>
      <el-scrollbar class="left-scrollbar" wrap-class="scrollbar-wrapper">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <icon-base icon="component" />
              {{ item.title }}
            </div>
            <draggable class="components-draggable" :list="item.list" :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent" draggable=".components-item" :sort="false" @end="onEnd">
              <div v-for="(element, index) in item.list" :key="index" class="components-item" @click="addComponent(element)">
                <div class="components-body">
                  <icon-base :icon="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-view" type="text" @click="showJson">
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text" @click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar"  wrap-class="scrollbar-wrapper">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item
                v-for="(element, index) in drawingList"
                :key="element.renderKey"
                :drawing-list="drawingList"
                :element="element"
                :index="index"
                :active-id="activeData.__config__.formId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
    />

    <code-type-dialog
      :visible.sync="dialogVisible"
      title="选择生成类型"
      :show-file-name="showFileName"
      @confirm="generate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'

import { makeUpJs } from './js/js'
import { makeUpCss } from './js/css'
import drawingDefalut from './js/drawingDefalut'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from './js/html'
import { inputComponents, selectComponents, layoutComponents, formConf } from './js/config'

import { isNumberStr, titleCase, deepClone, requireRemoteScript } from '@/utils'

import render from './components/render/render.vue'
import iconBase from './components/icon/iconBase.vue'
import RightPanel from './components/RightPanel.vue'
import DraggableItem from './components/DraggableItem.vue'
import CodeTypeDialog from './components/CodeTypeDialog.vue'

let beautifier: any
let tempActiveData: any
const exportDefault = 'export default '
const emptyActiveData = { style: {}, autosize: {} }

let beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

@Component({
  name: 'BuildForm',
  components: {
    draggable,
    iconBase,
    RightPanel,
    DraggableItem,
    CodeTypeDialog
  }
})
export default class BuildForm extends Vue {
  private formConf: any = formConf
  private drawingList: Array<any> = drawingDefalut
  private labelWidth: number = 100
  private drawerVisible: Boolean = false
  private formData: any = {}
  private dialogVisible: Boolean = false
  private jsonDrawerVisible: Boolean = false
  private generateConf: any = null
  private showFileName: Boolean = false
  private activeData: any = drawingDefalut[0]
  private activeId: any = (drawingDefalut[0] as any).__config__.formId
  private operationType: any = null
  private leftComponents: any = [{
    title: '输入型组件',
    list: inputComponents
  }, {
    title: '选择型组件',
    list: selectComponents
  }, {
    title: '布局型组件',
    list: layoutComponents
  }]
  private idGlobal = 100

  mounted() {
    const clipboard = new ClipboardJS('#copyNode', {
      text: (trigger: any) => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', (e: any) => {
      this.$message.error('代码复制失败')
    })

    requireRemoteScript('https://cdn.bootcdn.net/ajax/libs/js-beautify/1.11.0/beautifier.js', () => {
      beautifier = window['beautifier']
    })

    // fix: firefox 下 拖拽 会新打卡一个选项卡
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  activeFormItem(element: any) {
    this.activeData = element
    this.activeId = element.__config__.formId
  }
  onEnd(obj: any) {
    if (obj.from !== obj.to) {
      this.activeData = tempActiveData
      // this.activeId = this.idGlobal
    }
  }

  addComponent(item: any) {
    const clone = this.cloneComponent(item)
    this.drawingList.push(clone)
    this.activeFormItem(clone)
  }

  cloneComponent(origin: any) {
    const clone = deepClone(origin)
    const config = clone.__config__
    config.span = this.formConf.span // 生成代码时，会根据span做精简判断
    this.createIdAndKey(clone)
    clone.placeholder !== undefined && (clone.placeholder += config.label)
    tempActiveData = clone
    return tempActiveData
  }

  createIdAndKey(item: any) {
    const config = item.__config__
    config.formId = ++this.idGlobal
    config.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
    if (config.layout === 'colFormItem') {
      item.__vModel__ = `field${this.idGlobal}`
    } else if (config.layout === 'rowFormItem') {
      config.componentName = `row${this.idGlobal}`
      !Array.isArray(config.children) && (config.children = [])
      delete config.label // rowFormItem无需配置label属性
    }
    if (Array.isArray(config.children)) {
      config.children = config.children.map((childItem: any) => this.createIdAndKey(childItem))
    }
    return item
  }
  AssembleFormData() {
    this.formData = {
      fields: deepClone(this.drawingList),
      ...this.formConf
    }
  }

  generate(data: any) {
    const func = this[`exec${titleCase(this.operationType)}`]
    this.generateConf = data
    func && func(data)
  }

  execRun(data: any) {
    this.AssembleFormData()
    this.drawerVisible = true
  }

  execDownload(data: any) {
    const codeStr = this.generateCode()
    const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, data.fileName)
  }

  execCopy(data: any) {
    let copyNode = document.getElementById('copyNode')
    if (copyNode) {
      copyNode.click()
    }
  }

  empty() {
    this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
      () => {
        this.drawingList = []
        this.idGlobal = 100
      }
    )
  }

  drawingItemCopy(item: any, parent: any) {
    let clone = deepClone(item)
    clone = this.createIdAndKey(clone)
    parent.push(clone)
    this.activeFormItem(clone)
  }

  drawingItemDelete(index: any, parent: any) {
    parent.splice(index, 1)
    this.$nextTick(() => {
      const len = this.drawingList.length
      if (len) {
        this.activeFormItem(this.drawingList[len - 1])
      }
    })
  }

  generateCode() {
    const { type } = this.generateConf
    this.AssembleFormData()
    const script = vueScript(makeUpJs(this.formData, type))
    const html = vueTemplate(makeUpHtml(this.formData, type))
    const css = cssStyle(makeUpCss(this.formData))
    return beautifier.html(html + script + css, beautifierConf.html)
  }

  showJson() {
    this.AssembleFormData()
    this.jsonDrawerVisible = true
  }

  download() {
    this.dialogVisible = true
    this.showFileName = true
    this.operationType = 'download'
  }

  run() {
    this.dialogVisible = true
    this.showFileName = false
    this.operationType = 'run'
  }

  copy() {
    this.dialogVisible = true
    this.showFileName = false
    this.operationType = 'copy'
  }

  tagChange(newTag: any) {
    newTag = this.cloneComponent(newTag)
    const config = newTag.__config__
    newTag.__vModel__ = this.activeData.__vModel__
    config.formId = this.activeId
    config.span = this.activeData.__config__.span
    this.activeData.__config__.tag = config.tag
    this.activeData.__config__.tagIcon = config.tagIcon
    this.activeData.__config__.document = config.document
    if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
      config.defaultValue = this.activeData.__config__.defaultValue
    }
    Object.keys(newTag).forEach(key => {
      if (this.activeData[key] !== undefined) {
        newTag[key] = this.activeData[key]
      }
    })
    this.activeData = newTag
    this.updateDrawingList(newTag, this.drawingList)
  }

  updateDrawingList(newTag: any, list: any) {
    const index = list.findIndex((item: any) => item.__config__.formId === this.activeId)
    if (index > -1) {
      list.splice(index, 1, newTag)
    } else {
      list.forEach((item: any) => {
        if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
      })
    }
  }

  refreshJson(data: any) {
    this.drawingList = deepClone(data.fields)
    delete data.fields
    this.formConf = data
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/views/tools/build/stylus/buildForm.styl';
</style>
<style lang="stylus">
.drawing-board {
  height: 100%;
  position: relative;

  .components-body {
    padding: 0;
    margin: 0;
    font-size: 0;
  }

  .sortable-ghost {
    position: relative;
    display: block;
    overflow: hidden;

    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 3px;
      background: rgb(89, 89, 223);
      z-index: 2;
    }
  }

  .components-item.sortable-ghost {
    width: 100%;
    height: 60px;
    background-color: $selectedColor;
  }

  .active-from-item {
    & > .el-form-item {
      background: #f6f7ff;
      border-radius: 6px;
    }

    & > .drawing-item-copy, & > .drawing-item-delete {
      display: initial;
    }

    & > .component-name {
      color: #f6f7ff;
    }
  }

  .el-form-item {
    margin-bottom: 15px;
  }
}

.drawing-item {
  position: relative;
  cursor: move;

  &.unfocus-bordered:not(.active-from-item) > div:first-child {
    border: 1px dashed #ccc;
  }

  .el-form-item {
    padding: 12px 10px;
  }
}

.drawing-row-item {
  position: relative;
  cursor: move;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  border-radius: 3px;
  padding: 0 2px;
  margin-bottom: 15px;

  .drawing-row-item {
    margin-bottom: 2px;
  }

  .el-col {
    margin-top: 22px;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .drag-wrapper {
    min-height: 80px;
  }

  &.active-from-item {
    border: 1px dashed $lighterBlue;
  }

  .component-name {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #bbb;
    display: inline-block;
    padding: 0 6px;
  }
}

.drawing-item, .drawing-row-item {
  &:hover {
    & > .el-form-item {
      background: $selectedColor;
      border-radius: 6px;
    }

    & > .drawing-item-copy, & > .drawing-item-delete {
      display: initial;
    }
  }

  .drawing-item-copy, .drawing-item-delete {
    display: none;
    position: absolute;
    top: -10px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    border: 1px solid;
    cursor: pointer;
    z-index: 1;
  }

  .drawing-item-copy {
    right: 56px;
    border-color: $lighterBlue;
    color: $lighterBlue;
    background: #fff;

    &:hover {
      background: $lighterBlue;
      color: #fff;
    }
  }

  .drawing-item-delete {
    right: 24px;
    border-color: #F56C6C;
    color: #F56C6C;
    background: #fff;

    &:hover {
      background: #F56C6C;
      color: #fff;
    }
  }
}
</style>
