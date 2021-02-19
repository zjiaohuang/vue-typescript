<template>
  <div class="app-crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button v-if="crud.optShow.add" @click="crud.toAdd" size="mini" type="primary" icon="el-icon-plus">
        新增
      </el-button>
      <el-button v-if="crud.optShow.edit" @click="crud.toEdit(crud.selections[0])" :disabled="crud.selections.length !== 1" size="mini" type="success" icon="el-icon-edit">
        修改
      </el-button>
      <el-button v-if="crud.optShow.del" @click="toDelete(crud.selections)" :disabled="crud.selections.length === 0" size="mini" type="danger" icon="el-icon-delete">
        删除
      </el-button>
      <el-button size="mini" type="warning" icon="el-icon-download">
        导出
      </el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
    <el-button-group class="opts-right">
      <el-button size="mini" plain type="info" icon="el-icon-search" @click="toggleSearch()" />
      <el-button size="mini" icon="el-icon-refresh" @click="crud.refresh()" />
      <el-popover placement="bottom-end" width="150" trigger="click">
        <el-button slot="reference" size="mini" icon="el-icon-s-grid">
          <i class="fa fa-caret-down" aria-hidden="true" />
        </el-button>
        <el-checkbox v-model="allColumnsSelected" :indeterminate="allColumnsSelectedIndeterminate" @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-checkbox v-for="item in crud.props.tableColumns" :key="item.label" v-model="item.visible" @change="handleCheckedTableColumnsChange(item)">
          {{ item.label }}
        </el-checkbox>
      </el-popover>
    </el-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CRUD, { crud } from './crud'
import { mixins } from 'vue-class-component'

@Component({
  name: 'CrudOperation',
  mixins: [crud()]
})
export default class CrudOperation extends Vue {
  @Prop({ type: Boolean, default: true }) searchToggle?: boolean
  private allColumnsSelected: boolean = true
  private allColumnsSelectedIndeterminate: boolean = false

  created() {
    (this as any).crud.updateProp('searchToggle', this.searchToggle)
    console.log(this.searchToggle)
  }

  toDelete(datas: any[]) {
    this.$confirm(`确认删除选中的${datas.length}条数据?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      (this as any).crud.doDelete(datas)
    }).catch(() => {
    })
  }

  handleCheckAllChange(val: boolean) {
    if (val === false) {
      this.allColumnsSelected = true
      return
    }
    for (const key in (this as any).crud.props.tableColumns) {
      (this as any).crud.props.tableColumns[key].visible = val
    }
    this.allColumnsSelected = val
    this.allColumnsSelectedIndeterminate = false
  }

  handleCheckedTableColumnsChange(item: any) {
    let that: any = this
    let totalCount = 0
    let selectedCount = 0
    for (const key in that.crud.props.tableColumns) {
      ++totalCount
      selectedCount += that.crud.props.tableColumns[key].visible ? 1 : 0
    }
    if (selectedCount === 0) {
      that.crud.notify('请至少选择一列', CRUD.NOTIFICATION_TYPE.WARNING)
      this.$nextTick(function () {
        item.visible = true
      })
      return
    }
    this.allColumnsSelected = selectedCount === totalCount
    this.allColumnsSelectedIndeterminate = selectedCount !== totalCount && selectedCount !== 0
  }

  toggleSearch() {
    let that: any = this
    // that.crud.updateProp('searchToggle', !that.crud.props.searchToggle)
    this.$nextTick(() => {
      that.crud.props.searchToggle = !that.crud.props.searchToggle
      console.log(that.crud.props.searchToggle)
    })
  }
}
</script>

<style lang="stylus">
.app-crud-opts {
  padding: 4px 0 10px;
  display: flex;
  align-items: center;

  .opts-right {
    margin-left: auto;
  }
}
</style>
