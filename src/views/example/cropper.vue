<template>
  <div style="width:100%">
    <img-cropper ref="cropper" src="./img/typescript.jpg" :option="{dragMode:'move', aspectRatio:3/4}" />
    <div>
      <el-button type="primary" @click="handleClick">确定</el-button>
      <child-test />
    </div>
    <img :src="croppedImg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImgCropper from '@/components/ImgCropper/index.vue'

import childTest from './components/childTest.vue'

import lrz from 'lrz'

@Component({
  name: 'CropperDemo',
  components: {
    ImgCropper,
    childTest
  }
})
export default class CropperDemo extends Vue {
  private croppedImg: string = ''

  created() {
  }

  handleClick() {
    this.$http.post('/user/login', {}, null)
    console.log(this)

    let cropper: any = this.$refs.cropper
    let croppedCanvasOptions = {
      width: 150,
      height: 200
    }
    this.croppedImg = cropper.getCroppedImg(croppedCanvasOptions, 0.7)
    let croppedImg = cropper.getCroppedImg({}, 0.9)
    console.log(croppedImg)
    lrz(croppedImg, {
      width: 800, // 设置图片压缩后的最大宽度，默认为原图宽度
      height: 600, // 同上
      quality: 0.7, // 图片压缩质量，取值 0 - 1，默认为 0.7
      fieldName: 'aijquery'
    }).then(function (rst: any) {
      console.log(rst.base64)
    }).catch(function (err: any) { // 处理失败后执行
      console.log(err)
    })
  }
}
</script>

<style lang="stylus">
.priview {
  width: 150px;
  height: 200px;
}
</style>
