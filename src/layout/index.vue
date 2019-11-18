<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <!-- <sidebar class="sidebar-container" /> -->
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppMain } from './components'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  name: 'Layout',
  components: {
    AppMain
    // Sidebar
  }
})
export default class Layout extends Vue {
  @State(state => state.app.sidebar) sidebar: any
  @State(state => state.app.device) device: any

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: false,
      mobile: false
    }
  }
}
</script>

<style lang="stylus">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
