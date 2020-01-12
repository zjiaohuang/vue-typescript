<template>
  <PdfViewer pdfUrl="123" @pageNumChange="handlePageNumChange" />
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

<style lang="stylus"></style>
