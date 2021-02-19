<template>
  <div class="app-container">
    <!--工具栏-->
    <div>
      <transition name="el-fade-in">
        <div v-if="crud.props.searchToggle" class="app-query-container">
          <el-input v-model="crud.query.blurry" clearable size="small" placeholder="输入姓名或者工号" class="app-query-item" style="width: 200px;" @keyup.enter.native="crud.toQuery" />
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
      <el-table-column v-if="columns.visible('username')" prop="username" label="用户名" width="120" />
      <el-table-column v-if="columns.visible('sex')" prop="sex" label="性别" width="60" />
      <el-table-column v-if="columns.visible('phone')" prop="phone" width="150" label="电话" />
      <el-table-column v-if="columns.visible('email')" prop="email" label="邮箱" />
      <el-table-column v-if="columns.visible('dept')" prop="dept" label="分公司">
        <template slot-scope="scope">
          <div>{{ scope.row.dept.name }} </div>
        </template>
      </el-table-column>
      <el-table-column v-if="columns.visible('enabled')" label="状态" align="center" prop="enabled">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#F56C6C" @change="changeEnabled(scope.row, scope.row.enabled)" />
        </template>
      </el-table-column>
      <el-table-column v-if="columns.visible('createTime')" prop="createTime" width="140" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation :data="scope.row">
            <span class="app-crud-ud">数据权限1</span></udOperation>

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

import crudUser from '@/api/user/user'

import Dict from '@/components/Dict'
import queryOperation from '@/components/Curd/Query.operation.vue'
import crudOperation from '@/components/Curd/CRUD.operation.vue'
import pagination from '@/components/Curd/Pagination.vue'
import udOperation from '@/components/Curd/UD.operation.vue'
import CRUD, { presenter, form } from '@/components/Curd/crud'

const defaultCrud = CRUD({ title: '用户', crudMethod: { ...crudUser } })
const defaultForm = { id: null, username: null, email: null, enabled: 'false', phone: null, nickName: '123' }

@Component({
  name: 'UserList',
  components: {
    queryOperation,
    crudOperation,
    pagination,
    udOperation
  },
  mixins: [Dict, presenter(defaultCrud), form(defaultForm)]
})
export default class UserList extends Vue {
  private dict: any = { keys: ['user_status', 'sex'] }

  checkboxT(row: any, rowIndex: number) {
    return true
  }

  afterCrudRefresh() {
    alert(1)
  }

  changeEnabled(data: any, val: any) {
    this.$confirm('是否 "' + this.dict.label.user_status[(!val) ? '0' : '1'] + '" 用户' + data.username + '？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      crudUser.edit(data).then(res => {
        (this as any).crud.notify(this.dict.label.user_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      }).catch(() => {
        data.enabled = !data.enabled
      })
    }).catch(() => {
      data.enabled = !data.enabled
    })
  }

  beforeCrudToAdd() {
    alert(1)
    return true
  }
}
</script>

<style lang="stylus"></style>
