<template>
  <div>
    <div>
      <crud-operation :searchToggle="false"></crud-operation>
    </div>
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
const defaultForm = { id: null, username: null, email: null, enabled: 'false', phone: null }

@Component
export default class MenuList extends Vue {
  created() { }
}
</script>

<style lang="stylus"></style>
