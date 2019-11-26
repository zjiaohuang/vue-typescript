<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      class="hamburger-container"
      :is-active="sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <header-search
          id="header-search"
          class="right-menu-item"
        />

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <screenfull
          id="screenfull"
          class="right-menu-item hover-effect"
        />
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        v-once
      >
        <div class="avatar-wrapper">
          <img
            src="img/avatar.png"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout"
            >退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import storageUtil from '@/utils/storageUtil'

import Hamburger from './Hamburger/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
import HeaderSearch from './HeaderSearch/index.vue'
import screenfull from '@/components/Screenfull/index.vue'

@Component({
  components: {
    Hamburger,
    Breadcrumb,
    HeaderSearch,
    screenfull
  }
})
export default class Navbar extends Vue {
  @State(state => state.app.sidebar) sidebar: any
  @State(state => state.app.device) device: any

  toggleSideBar() {
    this.$store.dispatch('app/toggleSideBar')
  }

  logout() {
    this.$confirm('是否退出登录?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.doLogout()
      })
      .catch(() => {})
  }

  async doLogout() {
    await this.$store.dispatch('user/logout')
    let navigation = this.$store.state.navigation
    if (navigation && navigation.routes) {
      this.$router.go(0 - (navigation.routes.length - 1))
    } else {
      this.$router.replace('/login')
    }
    this.$message('已退出登录')
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/model/navbar.styl';
</style>
