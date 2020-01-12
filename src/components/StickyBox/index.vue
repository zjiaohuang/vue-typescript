<template>
  <div :class="className" :style="{zIndex:zIndex}">
    <div :style="stickyStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

// 默认图层
let defualtZIndex: number = 100

@Component({
  name: 'StickyBox'
})
export default class StickyBox extends Vue {
  @Prop({ required: false, default: '' }) className!: string
  @Prop({ required: false, default: 0 }) stickyTop!: number
  @Prop({ required: false, default: defualtZIndex }) zIndex!: number

  private height: number | string = 'auto'
  private width: string | number = 0
  private active: boolean = false
  private isSticky: boolean = false
  private position: string = ''

  get stickyStyle() {
    // {top:(isSticky ? stickyTop +'px' : ''),zIndex:zIndex,position:position,stickyStyle}
    let style: { [key: string]: any } = {
      top: (this.isSticky ? this.stickyTop + 'px' : ''),
      position: this.position,
      zIndex: this.zIndex
    }
    if (this.active) {
      style.width = this.width
    }
    return style
  }

  mounted() {
    defualtZIndex++
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  activated() {
    this.handleScroll()
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  sticky() {
    if (this.active) {
      return
    }
    this.position = 'fixed'
    this.active = true
    this.width = this.width + 'px'
    this.isSticky = true
  }

  handleScroll() {
    const width = this.$el.getBoundingClientRect().width
    this.width = width || 'auto'
    const offsetTop = this.$el.getBoundingClientRect().top
    const offsetBottom = this.$el.getBoundingClientRect().bottom
    if (offsetTop <= this.stickyTop) {
      this.sticky()
      return
    }
    this.handleReset()
  }

  handleReset() {
    if (!this.active) {
      return
    }
    this.reset()
  }

  reset() {
    this.position = ''
    this.width = 'auto'
    this.active = false
    this.isSticky = false
    console.log('重置this.active->', this.active)
  }

  handleResize() {
    if (this.isSticky) {
      this.width = this.$el.getBoundingClientRect().width + 'px'
    }
  }
}
</script>
