<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :default-active="activeMenuId" :collapse="isCollapse()" :unique-opened="false" :collapse-transition="false" text-color="#bfcbd9" background-color="#304156" active-text-color="#409EFF" mode="vertical">
      <sidebar-item v-for="menu in menus" :key="menu.id" :item="menu" :base-path="''" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'

import { reqMenusFun } from '@/api/user/menus'

@Component({
  components: {
    SidebarItem
  }
})
export default class Sidebar extends Vue {
  private menus: Array<any> = []
  private activeMenuId: any = ''

  created() {
    reqMenusFun(this, {}).then((response) => {
      console.log(response.data.result)
      this.menus = this.menus.concat(response.data.result)
      this.$store.dispatch('user/setMenus', response.data.result)
      // 配置默认选择菜单
      this.activeMenuId = this.menus[0].id
    })
  }

  /**
   * 是否折叠菜单
   */
  isCollapse() {
    // return true
    return !this.$store.state.app.sidebar.opened
  }
}
</script>
