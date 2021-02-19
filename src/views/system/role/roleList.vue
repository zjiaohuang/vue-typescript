<template>
  <div class="app-container">
    <!--工具栏-->
    <div>
      <transition name="el-fade-in">
        <div v-if="crud.props.searchToggle" class="app-query-container">
          <el-input v-model="crud.query.blurry" clearable size="small" placeholder="输入角色名" class="app-query-item" style="width: 200px;" @keyup.enter.native="crud.toQuery" />
          <el-select v-model="crud.query.enabled" clearable size="small" placeholder="状态" class="app-query-item" style="width: 90px" @change="crud.toQuery">
            <el-option v-for="item in dict.user_status" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
          <queryOperation :crud="crud"></queryOperation>
        </div>
      </transition>
      <crud-operation :searchToggle="false"></crud-operation>
    </div>

    <!--表格渲染-->
    <el-table ref="table" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column v-if="columns.visible('roleName')" prop="roleName" label="角色名称" />
      <el-table-column v-if="columns.visible('roleLeve')" prop="roleLeve" label="角色级别" />
      <el-table-column v-if="columns.visible('enabled')" label="状态" align="center" prop="enabled">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#F56C6C" @change="changeEnabled(scope.row, scope.row.enabled)" />
        </template>
      </el-table-column>
      <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="columns.visible('memo')" prop="memo" label="描述" />
      <el-table-column label="操作" width="125" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation :data="scope.row">
          </udOperation>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />

    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="570px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="66px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="form.phone" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import crudRole from '@/api/system/role'

import Dict from '@/components/Dict'
import queryOperation from '@/components/Curd/Query.operation.vue'
import crudOperation from '@/components/Curd/CRUD.operation.vue'
import pagination from '@/components/Curd/Pagination.vue'
import udOperation from '@/components/Curd/UD.operation.vue'
import CRUD, { presenter, form } from '@/components/Curd/crud'

const defaultCrud = CRUD({ title: '角色', crudMethod: { ...crudRole } })
const defaultForm = { }

@Component({
  name: 'RoleList',
  components: {
    queryOperation,
    crudOperation,
    pagination,
    udOperation
  },
  mixins: [Dict, presenter(defaultCrud), form(defaultForm)]
})
export default class RoleList extends Vue {
  private dict: any = { keys: ['user_status'] }

  /**
   * 判断是不是checkbox是否可选
   */
  checkboxT(row: any, rowIndex: number) {
    return true
  }
}
</script>

<style lang="stylus"></style>
