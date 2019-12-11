<template>
  <div class="app-container" @click="doclick">
    404
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EroorPage extends Vue {
  doclick() {
    this.$router.push('/')
  }
}
</script>
