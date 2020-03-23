<template>
  <div class="app-container">
    <crud-operation></crud-operation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import crudOperation from '@/components/Curd/CRUD.operation.vue'

@Component({
  name: 'UserList',
  components: {
    crudOperation
  }
})
export default class UserList extends Vue {
  created() { }
}
</script>

<style lang="stylus"></style>
