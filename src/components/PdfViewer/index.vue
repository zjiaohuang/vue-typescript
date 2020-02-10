<template>
  <div>
    <iframe :src='ifameSrc' width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'PdfViewer'
})
export default class PdfViewer extends Vue {
  @Prop({ required: true, default: '', type: String }) pdfUrl!: string

  private _pdf: string = this.pdfUrl

  get ifameSrc() {
    return `./vendors/pdfjs/web/viewer.html?pdf=${this._pdf}`
  }

  beforeCreate() {
    localStorage.removeItem('pdfjs.history')
  }

  created() {
    window.pdfPageChange = this.pageChange
  }

  beforeDestroy() {
    delete window.pdfPageChange
  }

  pageChange(currentPageNum: number, totalPageNum: number) {
    this.$emit('pageNumChange', currentPageNum, totalPageNum)
  }
}
</script>

<style lang="stylus"></style>
