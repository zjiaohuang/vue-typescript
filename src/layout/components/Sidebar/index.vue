<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu()"
      :collapse="isCollapse()"
      :unique-opened="false"
      :collapse-transition="false"
      text-color="#bfcbd9"
      background-color="#304156"
      active-text-color="#409EFF"
      mode="vertical"
    >
      <sidebar-item
        v-for="menu in menus"
        :key="menu.id"
        :item="menu"
        :base-path="''"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'

@Component({
  components: {
    SidebarItem
  }
})
export default class Sidebar extends Vue {
  private menus: Array<any> = [
    {
      id: '1',
      name: '首页',
      path: '/'
    },
    {
      id: '2',
      name: '首页',
      children: [
        {
          id: '3',
          name: '首页',
          path: '/login'
        }
      ]
    }
  ]

  /**
   * 配置默认选择菜单
   */
  activeMenu() {
    return this.menus[0].id
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
