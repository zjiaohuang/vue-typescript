<template>
  <div class="app-crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button size="mini" type="primary" icon="el-icon-plus">
        新增
      </el-button>
      <el-button size="mini" type="success" icon="el-icon-edit">
        修改
      </el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">
        删除
      </el-button>
      <el-button size="mini" type="warning" icon="el-icon-download">
        导出
      </el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'CrudOperation'
})
export default class CrudOperation extends Vue {
  @Prop({ type: Object })
  created() { }
}
</script>

<style lang="stylus">
.app-crud-opts {
  padding: 4px 0;
  display: flex;
  align-items: center;

  .opts-right {
    margin-left: auto;
  }
}
</style>
