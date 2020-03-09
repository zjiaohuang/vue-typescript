<template>
  <div>
    输入框去除
    <input v-model="a" v-no-emoji /> {{a}}
    <br />
    textarea去除
    <textarea v-model="b" v-no-emoji>
    </textarea>
    {{b}}
    <p />
    第三方ui去除
    <el-input v-model="input" placeholder="请输入内容" v-no-emoji></el-input>
    {{input}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { noEmoji } from '@/directives/noEmoji'

@Component({
  directives: {
    noEmoji
  }
})
export default class ClearEmojiDemo extends Vue {
  private a: string = '测试'
  private b: string = '123'
  private input: string = ''
}
</script>

<style lang="stylus"></style>
