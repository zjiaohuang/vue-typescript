<template>
  <PdfViewer pdfUrl="123" @pageNumChange="handlePageNumChange" class="pdfView" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import PdfViewer from '@/components/PdfViewer/index.vue'

@Component({
  components: {
    PdfViewer
  }
})
export default class pdf extends Vue {
  created() { }

  handlePageNumChange(currentPage: number, totalNum: number) {
    if (currentPage === totalNum) {
      this.$message('已到最后一页了')
    }
  }
}
</script>

<style lang="stylus">
.pdfView {
  height 'calc(100vh - %s - 3px)' % $navBarHeight
}
</style>
