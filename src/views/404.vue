<template>
  <div class="app-container">
    404
    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
    </el-date-picker>
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
