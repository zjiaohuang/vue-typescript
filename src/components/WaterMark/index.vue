<template>
  <div class="water-mark">
    <div class="water-mark-container">
      <slot></slot>
    </div>
    <div v-if="!!$scopedSlots.watermark || content" class="water-mark-list" ref="mark">
      <div class="water-mark-list-wrapper" :style="$listWrapperStyle()">
        <template v-if="content">
          <canvas ref="canvas" class="water-mark-canvas"></canvas>
        </template>
        <template v-else-if="!!$scopedSlots.watermark">
          <ul v-for="i in (repeatY ? repetition : 1)" class="water-mark-line" :style="{marginBottom: spacing}" :key="`line-${i}`">
            <li v-for="j in (repeatX ? repetition : 1)" class="water-mark-item" :style="i % 2 === 0 ? {marginLeft: repeatX ? spacing : 0} : {marginRight: repeatX ? spacing : 0}" :key="`item-${j}`">
              <slot name="watermark" :coord="{row: i, col: j}"></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'WaterMark'
})
export default class WaterMark extends Vue {
  @Prop() content!: string
  @Prop({ default: '20vw' }) spacing!: string
  @Prop({ default: 0.2 }) opacity!: string | number
  @Prop({ default: -30 }) rotate!: string | number
  @Prop({ type: Boolean, default: true }) repeatX!: boolean
  @Prop({ type: Boolean, default: true }) repeatY!: boolean

  mounted() {

  }

  $listWrapperStyle() {
    return {
      opacity: this.opacity,
      transform: `rotate(${this.rotate}deg)`
    }
  }
}
</script>

<style lang="stylus"></style>
