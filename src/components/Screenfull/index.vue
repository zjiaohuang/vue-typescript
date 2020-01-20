<template>
  <div @click.stop="click">
    <i v-if="!$slots.default" class="el-icon-full-screen screenfull-svg" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Screenfull extends Vue {
  // 异步加载的screenfull组件
  private screenfull: any = null

  mounted() {
    import(/* webpackChunkName: "chunk-screenfull" */ 'screenfull').then(
      (screenfull: any) => {
        this.screenfull = screenfull.default
      }
    )
  }

  beforeDestroy() {
    this.screenfull = null
  }

  click($event: Event) {
    if (!this.screenfull.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    this.screenfull.toggle()
  }
}
</script>

<style lang="stylus">
.screenfull-svg {
  font-size: 20px;
  vertical-align: middle;
}
</style>
