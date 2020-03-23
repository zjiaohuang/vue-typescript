<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg class="svg-icon" viewBox="0 0 1032 1024" xmlns="http://www.w3.org/2000/svg" width="129" height="128">
            <path d="M494.87 507.636c160.94 0 291.405-111.604 291.405-249.237 0-137.665-130.465-249.23-291.405-249.23-160.924 0-291.412 111.565-291.396 249.23 0 137.633 130.472 249.237 291.404 249.237zm133.585 83.102H385.591c-207.889 0-376.434 144.123-376.434 321.91v20.78c0 72.666 168.545 72.736 376.434 72.736h242.864c207.865 0 376.403-2.683 376.403-72.736v-20.771c0-177.796-168.522-321.919-376.403-321.919z" />
          </svg>
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" autocomplete="off" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg class="svg-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="128" height="128">
              <path d="M870.4 354.576H716.8v-42.88c0-72.32-26.464-193.304-204.8-193.304-185.16 0-204.8 135.048-204.8 193.296v42.888H153.6v-42.88C153.6 122.248 294.384 0 512 0c217.616 0 358.4 122.248 358.4 311.688v42.888zm-256 314.848c0-43.52-46.104-78.656-102.4-78.656-56.296 0-102.4 35.136-102.4 78.656 0 29.456 20.536 54.464 51.256 67.816v89.64c0 21.744 23 39.696 51.2 39.696 28.192 0 51.2-17.952 51.2-39.696v-89.64c30.664-13.352 51.144-38.36 51.144-67.816zM1024 512v393.608C1024 970.872 954.84 1024 870.4 1024H153.6C69.208 1024 0 970.872 0 905.608V512c0-65.224 69.16-118.392 153.6-118.392h716.8c84.44 0 153.6 53.168 153.6 118.392z" />
            </svg>
          </span>
          <el-input :key="passwordType" :type="passwordType" ref="password" v-model="loginForm.password" placeholder="Password" name="password" tabindex="2" autocomplete="off" @keyup.native="onCheckCapslock" @blur="capsTooltip = false" @keyup.enter.native="onHandleLogin" />
          <span class="show-pwd" @click="onShowPwd">
            <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="onHandleLogin">登陆
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'

@Component
export default class EroorPage extends Vue {
  private passwordType: string = 'password'
  private capsTooltip: boolean = false
  private loading: boolean = false

  private loginForm: any = {
    username: 'admin',
    password: '111111'
  }

  private loginRules: any = {
    username: [
      {
        required: true,
        trigger: 'blur',
        validator: this._checkUsername
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: this._checkPassword
      }
    ]
  }

  _checkUsername(rule: any, value: string, callback: Function) {
    if (value === null || value === '') {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }

  _checkPassword(rule: any, value: string, callback: Function) {
    if (value === null || value === '') {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }

  onShowPwd() {
    console.log(123)
  }

  onCheckCapslock(event: KeyboardEvent) {
    event = event || {}
    let { shiftKey, key } = event
    if (key && key.length === 1) {
      if (shiftKey || (!shiftKey && (key >= 'A' && key <= 'Z'))) {
        this.capsTooltip = true
      } else {
        this.capsTooltip = false
      }
    }
    if (key === 'CapsLock' && !this.capsTooltip) {
      this.capsTooltip = true
    }
  }

  onHandleLogin() {
    // this.$store.commit('user/SET_TOKEN', 1)
    let redirect: any = this.$route.query['redirect']

    this.$store.dispatch('user/login', {}).then(() => {
      this.doPush(redirect || '/')
    }).catch(() => {

    })
  }
}
</script>

<style lang="stylus">
.svnIcon {
  width: 20px;
  height: 20px;
  overflow: hidden;
  fill: #5a5e66;
}
</style>
