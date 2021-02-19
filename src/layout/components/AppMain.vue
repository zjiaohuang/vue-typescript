<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class AppMain extends Vue {
  get cachedViews() {
    // return this.$store.state.tagsView.cachedViews
    return []
  }

  get key() {
    return this.$route.path
  }
}
</script>

<style lang="stylus">
.app-main {
  min-height: calc(100vh - 50px);
}

.hasTagsView .app-main {
  min-height: calc(100vh - 84px);
}
</style>
