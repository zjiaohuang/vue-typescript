import { Vue, Component } from 'vue-property-decorator'
import { dictDetailFun } from '@/api/dict/index'

@Component
export default class Dict extends Vue {
  created() {
    if (this.$data.dict) {
      this.initDict(this.$data.dict.keys)
    }
  }

  /**
   * 初始化字典
   * @param {string[]} names 查询字典数组
   * @memberof Dict
   */
  initDict(names: string[]) {
    names.forEach(name => {
      this.$set(this.$data.dict, name, [])
    })

    dictDetailFun(this.$data.dict.keys).then(res => {
      if (res.data.isSuccess()) {
        let dictMap = res.data.result
        names.forEach(name => {
          this.$set(this.$data.dict, name, dictMap[name])
        })
        console.log(this.$data)
      }
    })
  }
}
