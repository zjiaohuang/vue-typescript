<template>
  <el-dropdown-item @click.native.prevent.stop="doGuide">页面介绍</el-dropdown-item>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'driver.js/dist/driver.min.css'
import { guideSteps } from './steps'

@Component
export default class MainGuide extends Vue {
  private driver: any
  doGuide() {
    if (!this.driver) {
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        'driver.js').then(
        (driver: any) => {
          let Driver = driver.default
          this.driver = new Driver()
          this.driver.defineSteps(guideSteps)
          this.driver.start()
        }
      )
    } else {
      this.driver.start()
    }
  }
}
</script>

<style lang="stylus"></style>
