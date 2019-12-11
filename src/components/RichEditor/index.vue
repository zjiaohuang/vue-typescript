<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import dynamicLoad from '@/utils/dynamicLoadScript'

import plugins from './plugins'
import toolbar from './toolbar'

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

@Component({
  name: 'RichEditor'
})
export default class RichEditor extends Vue {
  @Prop({ default: null, required: false, type: String }) id!: string
  @Prop({ default: null, required: false, type: String }) value!: string
  @Prop({ default: 300, required: false, type: Number }) height!: number
  @Prop({ default: 'auto', required: false, type: String }) width!: string
  @Prop({ default: 'file edit insert view format table', type: String }) menubar!: string

  private hasInit: boolean = false
  private hasChange: boolean = false
  private fullscreen: boolean = false
  private tinymceId: string | null = null
  private languageTypeList: { [key: string]: string } = {
    en: 'en',
    zh: 'zh_CN',
    es: 'es_MX',
    ja: 'ja'
  }

  get containerWidth() {
    const width = this.width
    if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
      return `${width}px`
    }
    return width
  }

  @Watch('value')
  setValue(val: string) {
    if (!this.hasChange && this.hasInit) {
      this.$nextTick(() =>
        window.tinymce.get(this.tinymceId).setContent(val || ''))
    }
  }

  created() {
    if (!this.id) {
      this.tinymceId = 'richEditor_' + ((Math.random() * 1000).toFixed(0) + '')
    } else {
      this.tinymceId = this.id
    }
  }

  mounted() {
    dynamicLoad(tinymceCDN, this.handleLoaded, this.checkHasLoaded)
  }

  beforeDestroy() {
    this.destroyTinymce()
  }

  handleLoaded(error: Error | null) {
    if (error) {
      console.log('异步加载tinymce异常', tinymceCDN)
    }
    this.initTinymce()
  }

  checkHasLoaded() {
    console.log('检验富文本编辑器tinymce加载完成', window.tinymce)
    return window.tinymce
  }

  initTinymce() {
    const _this = this
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      language: this.languageTypeList['zh'],
      height: this.height,
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: toolbar,
      menubar: this.menubar,
      plugins: plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      link_title: false,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      init_instance_callback: (editor: any) => {
        if (_this.value) {
          editor.setContent(_this.value)
        }
        _this.hasInit = true
        editor.on('NodeChange Change KeyUp SetContent', () => {
          this.hasChange = true
          this.$emit('input', editor.getContent())
        })
      },
      setup(editor: any) {
        editor.on('FullscreenStateChanged', (e: any) => {
          console.log('fullscreen', e.state)
          _this.fullscreen = e.state
        })
      }
    })
  }
  destroyTinymce() {
    const tinymce = window.tinymce.get(this.tinymceId)
    if (this.fullscreen) {
      tinymce.execCommand('mceFullScreen')
    }

    if (tinymce) {
      tinymce.destroy()
    }
  }
}
</script>

<style lang="stylus">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container .mce-fullscreen {
  z-index: 10000;
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /* z-index: 2005; */
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
