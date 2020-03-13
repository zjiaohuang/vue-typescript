<template>
  <div class="app-container">
    <rich-editor v-model="test" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import RichEditor from '@/components/RichEditor/index.vue'

@Component({
  name: 'RichEditorDemo',
  components: {
    RichEditor
  }
})
export default class RichEditorDemo extends Vue {
  created() { }
}
</script>

<style lang="stylus"></style>
