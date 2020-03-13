<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu ref="menus" :default-active="activeMenuId" :collapse="isCollapse()" :unique-opened="true" :collapse-transition="false" text-color="#bfcbd9" background-color="#304156" active-text-color="#409EFF" mode="vertical">
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

  // get activeMenuId():string {
  //   const route = this.$route
  //   const { meta, path } = route
  //   // if set path, the sidebar will highlight the path you set
  //   if (meta.activeMenu) {
  //     return meta.activeMenu
  //   }
  //   return path
  // }

  created() {
    // 查询服务端菜单数据
    reqMenusFun(this, {}).then((response) => {
      console.log(response.data.result)
      this.menus = this.menus.concat(response.data.result)
      // 将菜单数据存储到vuex中方便菜单查询组件使用
      this.$store.dispatch('user/setMenus', response.data.result)
      // 配置默认选择菜单
      this.activeMenuId = this.menus[0].id
    })

    window.eventBus.$on('selected.seach.menu', (menuId:string) => {
      this.activeMenuId = menuId
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
