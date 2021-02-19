<template>
  <div>
    <button type="button" @click="testClick">子组件</button>
  </div>
</template>
<script>
export default {
  name: 'ChildTest',
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  methods: {
    testClick: function () {
      console.log(this)
      console.log(this.$vnode.tag)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" ></style>
