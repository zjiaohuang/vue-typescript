<template>
  <div class="app-container">
    首页
    <rich-editor v-model="test" />
    {{test}}
    {{obj.a}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import RichEditor from '@/components/RichEditor/index.vue'

@Component({
  name: 'Dashboard',
  components: {
    RichEditor
  }
})
export default class Dashboard extends Vue {
  private obj: number = 0
  private test: string = '<b>你好</b>'
}
</script>

<style lang="stylus"></style>
