<!--搜索与重置-->
<template>
  <span class="queryOperation">
    <el-button size="mini" type="success" icon="el-icon-search" @click="crud.toQuery">搜索</el-button>
    <el-button size="mini" type="warning" icon="el-icon-refresh-left" @click="crud.resetQuery()">重置</el-button>
  </span>
</template>
<script>
export default {
  props: {
    crud: {
      type: Object,
      required: true
    }
  }
}
</script>
