<template>
  <div>
    test1:{{ test1 }}
    <p> test:{{ test }}</p>
    <el-button
      type="primary"
      @click="onBtnClick"
    >主要按钮</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Watch, Vue, Emit } from 'vue-property-decorator'
import { reqFun } from '@/api/example/test'

@Component
export default class ExampleIndex extends Vue {
  @Provide() test1: string = ''
  @Provide() test: string = '123'

  @Watch('test')
  testChange() {
    console.log(this.test)
  }

  @Emit('test1Change')
  onBtnClick(): string {
    let a = 1
    this.$alert('这是一段内容', '标题名称', {
      confirmButtonText: '确定',
      callback: action => {
        this.$message({
          type: 'info',
          message: `action: ${action}`
        })
      }
    })

    this.test1 = 'click'
    this.test = +new Date() + ''
    return this.test1
  }

  created() {
    const h = this.$createElement
    this.$message({
      message: h('p', {}, [
        h('span', {}, '内容可以是 '),
        h('i', { style: 'color: teal' }, 'VNode')
      ])
    })
    console.log('created')

    reqFun(this, { xx: null })
      .then(response => {
        console.log(response.data.result.name)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
