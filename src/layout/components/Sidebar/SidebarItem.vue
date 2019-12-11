<template>
  <!--如果没有根元素包裹父组件for循环时会出现递归调用栈溢出问题，先这样吧-->
  <div class="menu-wrapper">
    <app-link
      v-if="hasOneShowingChild(item.children, item)"
      :to="resolvePath(onlyOneChild)"
    >
      <el-menu-item
        :index="item.id"
        :class="{'submenu-title-noDropdown':!isNest}"
      >
        <app-item
          :icon="onlyOneChild.icon"
          :title="onlyOneChild.name"
        />
      </el-menu-item>
    </app-link>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item).path"
      popper-append-to-body
    >
      <app-item
        :icon="item.icon"
        :title="item.name"
        slot="title"
      />
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="basePath"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import appLink from './Link.vue'
import appItem from './Item.vue'

/**
 * 判断是否是外部链接
 */
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

@Component({
  name: 'SidebarItem',
  components: {
    appLink,
    appItem
  }
})
export default class SidebarItem extends Vue {
  // 路由
  @Prop({ required: true }) item: any
  // 根目录
  @Prop({ default: '' }) basePath: any
  // 是否是子菜单
  @Prop({ default: false }) isNest: any

  // 没有子菜单
  onlyOneChild: any = null

  /**
  判断是否有子菜单
   */
  hasOneShowingChild(children = [], parent: any) {
    if (children.length === 0) {
      this.onlyOneChild = parent
      return true
    }
    return false
  }

  /**
   * 处理菜单路径
   */
  resolvePath(route: any): { [key: string]: any } {
    let result: { [key: string]: any } = {}
    result.id = route.id

    if (!route.path) {
      result.path = route.id
      return result
    }
    result.path = route.path
    if (isExternal(route.path)) {
      result.external = true
    } else {
      result.external = false
    }
    return result
  }
}
</script>
