<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="大写锁定"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input
            :key="passwordType"
            :type="passwordType"
            ref="password"
            v-model="loginForm.password"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="off"
            @keyup.native="onCheckCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="onHandleLogin"
          />
          <span
            class="show-pwd"
            @click="onShowPwd"
          >
            <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="onHandleLogin"
      >登陆
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import routerMap from '@/routers/routerMap'

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
    this.$store.commit('user/SET_TOKEN', 1)
    let redirect: any = this.$route.query['redirect']

    this.$router.addRoutes([
      {
        path: '/demo',
        component: routerMap.Layout,
        redirect: '/dashboard',
        children: [
          {
            path: '404',
            component: routerMap['404'],
            name: '404',
            meta: { title: '404', icon: 'error' }
          }
        ]
      }
    ])

    this.doPush(redirect || '/')
  }
}
</script>
