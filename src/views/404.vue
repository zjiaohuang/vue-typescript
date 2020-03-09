<template>
  <div class="app-container">
    404
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EroorPage extends Vue {
  private value1: string = ''
  doclick() {
    this.$router.push('/')
  }
}
</script>
