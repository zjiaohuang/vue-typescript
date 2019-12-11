<template>
  <div v-if="errorLogs.length>0">
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <svg class="errorLog hasError" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="128" height="128">
        <path
          d="M969.143 548.571q0 14.848-10.862 25.71t-25.71 10.862h-128q0 97.719-38.29 165.705L885.138 870.29Q896 881.152 896 896t-10.862 25.71q-10.276 10.861-25.71 10.861t-25.71-10.861L720.568 809.143q-2.853 2.852-8.558 7.424t-23.99 16.274-37.157 20.846-46.848 16.567-55.443 7.424v-512H475.43v512q-29.148 0-58.003-7.717t-49.7-18.87-37.705-22.273-24.869-18.578l-8.558-8.01-104.557 118.273q-11.447 11.995-27.429 11.995-13.714 0-24.576-9.143-10.862-10.276-11.703-25.417t8.85-26.587L252.6 741.632q-33.134-65.134-33.134-156.562h-128q-14.848 0-25.71-10.862t-10.861-25.71 10.861-25.71 25.71-10.861h128v-168.01l-98.852-98.852q-10.862-10.862-10.862-25.71t10.862-25.71 25.71-10.861 25.709 10.862l98.853 98.852h482.304l98.852-98.852q10.862-10.862 25.71-10.862t25.71 10.862 10.861 25.71-10.861 25.71l-98.853 98.852v168.009h128q14.848 0 25.71 10.862t10.861 25.71zM694.857 219.43H329.143q0-75.996 53.43-129.427T512 36.572t129.426 53.43 53.431 129.427z"
        >
        </path>
      </svg>
    </el-badge>
    <el-dialog :visible.sync="dialogTableVisible" width="80%" destroy-on-close append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">错误日志</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">清除</el-button>
      </div>
      <el-table :data="errorLogs" height='300' border>
        <el-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ row.vm.$vnode.tag }} error in {{ row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ErrorLog'
})
export default class ErrorLog extends Vue {
  private dialogTableVisible: boolean = false

  get errorLogs(): Array<any> {
    return this.$store.getters.errorLogs
  }

  clearAll() {
    this.dialogTableVisible = false
    this.$store.dispatch('errorLog/clearErrorLog')
  }
}
</script>

<style lang="stylus">
.errorLog {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  overflow: hidden;
  fill: #5a5e66;
}

.errorLog.hasError {
  fill: #ff4949;
}
</style>
