<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ImgCropper extends Vue {
  private imgCropper:any
  created() {
    import(/* webpackChunkName: "chunk-cropperjs" */ 'cropperjs').then(
      (imgCropper: any) => {
        this.imgCropper = imgCropper.default
      }
    )
  }
}
</script>

<style lang="stylus"></style>
