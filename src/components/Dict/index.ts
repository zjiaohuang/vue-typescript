import { Vue, Component, Inject } from 'vue-property-decorator'
import { dictDetailFun } from '@/api/dict/index'

@Component
export default class Dict extends Vue {
  created() {
    console.log(this)
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
        let labelMap = {}
        names.forEach(name => {
          this.$set(this.$data.dict, name, dictMap[name])
          let dictVal = {}
          for (let i = 0; i < dictMap[name].length; i++) {
            let oneDict:any = dictMap[name][i]
            dictVal[oneDict.value] = oneDict.label
          }
          labelMap[name] = dictVal
        })
        this.$set(this.$data.dict, 'label', labelMap)
        console.log(this.$data)
      }
    })
  }
}
