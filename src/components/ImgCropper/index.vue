<template>
  <div :style="wrapStyle" class="cropperWrap">
    <img ref="img" :style="imgStyle" :src="src" class="cropperImg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import 'cropperjs/dist/cropper.min.css'

/***
   拖拽图片模式
    - crop 形成新的裁剪框
    - move 图片可移动
    - none 什么也没有
   */
type DragMode = 'crop' | 'move' | 'none'
/**
   视图控制
    - 0 无限制
    - 1 限制裁剪框不能超出图片的范围
    - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
    - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
   */
type ViewMode = 0 | 1 | 2 | 3
/**
 * 图片的质量 默认low 还有medium、high
 */
type ImageSmoothingQuality = 'low' | 'medium' | 'high'

export interface Data {
  x: number
  y: number
  width: number
  height: number
  rotate: number
  scaleX: number
  scaleY: number
}

export interface CropperOption {
  aspectRatio?: number
  autoCrop?: boolean
  autoCropArea?: number
  background?: boolean
  center?: boolean
  checkCrossOrigin?: boolean
  checkOrientation?: boolean
  crop?(event: CustomEvent): void
  cropBoxMovable?: boolean
  cropBoxResizable?: boolean
  cropend?(event: CustomEvent): void
  cropmove?(event: CustomEvent): void
  cropstart?(event: CustomEvent): void
  data?: Data
  dragMode?: DragMode
  guides?: boolean
  highlight?: boolean
  initialAspectRatio?: number
  minCanvasHeight?: number
  minCanvasWidth?: number
  minContainerHeight?: number
  minContainerWidth?: number
  minCropBoxHeight?: number
  minCropBoxWidth?: number
  modal?: boolean
  movable?: boolean
  preview?: Element | Element[] | NodeList | string
  ready?(event: CustomEvent): void
  responsive?: boolean
  restore?: boolean
  rotatable?: boolean
  scalable?: boolean
  toggleDragModeOnDblclick?: boolean
  viewMode?: ViewMode
  wheelZoomRatio?: number
  zoom?(event: CustomEvent): void
  zoomOnTouch?: boolean
  zoomOnWheel?: boolean
  zoomable?: boolean
}

export interface GetCroppedCanvasOptions {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  fillColor?: string;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
}

let defaultCropperOption = function (): CropperOption {
  return {
    viewMode: 1,
    dragMode: 'none',
    initialAspectRatio: 1,
    aspectRatio: 1,
    background: true,
    autoCropArea: 0.6,
    zoomOnWheel: false
  }
}

@Component
export default class ImgCropper extends Vue {
  @Prop({ required: true, type: String }) src!: string
  @Prop({ required: false, type: Object }) wrapStyle!: object
  @Prop({ required: false, type: Object }) imgStyle!: object
  @Prop({ required: false, type: Object, default: defaultCropperOption }) option!: CropperOption

  private imgCropper?: any
  created() {
    import(/* webpackChunkName: "chunk-cropperjs" */ 'cropperjs').then(
      (imgCropper: any) => {
        let mergeOption = { ...defaultCropperOption(), ...this.option }
        let Cropper = imgCropper.default
        this.imgCropper = new Cropper(this.$refs.img, mergeOption)
      }
    )
  }

  beforeDestroy() {
    if (this.imgCropper) {
      this.imgCropper.clear()
      this.imgCropper.destroy()
    }
  }

  getCroppedImg(option?: GetCroppedCanvasOptions, quality?: any): string {
    return this.imgCropper.getCroppedCanvas(option).toDataURL('image/jpeg', quality)
  }

  getCroppedBlob(option?: GetCroppedCanvasOptions, type?: string, quality?: any): Promise<Blob | null> {
    return new Promise(resolve => {
      this.imgCropper.getCroppedCanvas(option).toBlob((blob: Blob | null) => {
        resolve(blob)
      }, type, quality)
    })
  }
}
</script>

<style lang="stylus">
.cropperWrap {
  .cropperImg {
    /* Ensure the size of the image fit the container perfectly */
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
