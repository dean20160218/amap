<template>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../assets/vux_logo.png">
            <h1></h1>
        </div>
        <group class="weui-cells_form">
            <x-input placeholder="手机号" is-type="china-mobile" type="tel" v-model="phone" ref="refPhone"
                     :required="true"></x-input>
            <x-input placeholder="密码(6-18位)" :min="6" :max="18" type="password" v-model="password" ref="refPassword"
                     :required="true"></x-input>
        </group>
        <box gap="20px 10px">
            <x-button :gradients="['#4b4b4b', '#7d7d7d']" :disabled="loginDis" :show-loading="showLogin" @click.native="login">登录

            </x-button>
        </box>
        <box gap="0px 10px">
            <router-link :to="{ path: '/forgetPwd'}"><span>忘记密码?去找回...</span></router-link>
            <router-link :to="{ path: '/register'}"  class="a-right"><span>还未注册?去注册...</span></router-link>
        </box>
    </div>
</template>
<script>
  import { Group, Box, XInput, XButton, Countdown } from 'vux'
  import requsetHandle from '../request/main'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Box,
      Countdown
    },
    data () {
      return {
        phone: '',
        password: '',
        code: '',
        showLogin: false,
        loginDis: false
      }
    },
    methods: {
      login () {
        let _this = this
        _this.startLogin()
        if (this.phone === '' || !this.$refs.refPhone.valid) {
          this.$refs.refPhone.focus()
          this.$vux.toast.text('请正确填写手机号', 'bottom')
          return
        }
        if (this.password === '' || !this.$refs.refPassword.valid) {
          this.$refs.refPassword.focus()
          this.$vux.toast.text('请正确填写密码', 'bottom')
          return
        }
        requsetHandle.post('/api/user/login', {
          phone: this.phone,
          password: this.password
        }).then(function (response) {
          _this.endLogin()
          response = requsetHandle.handleRespons(response, _this)
          if (response.status === 1) {
            _this.$store.commit('updateIsLoginStatus', {isLogin: true})
            _this.$router.push(_this.$route.query.path ? _this.$route.query.path : '/')
          }
        }).catch(function (error) {
          _this.endLogin()
          requsetHandle.handleError(error, _this)
        })
      },
      startLogin () {
        this.showLogin = true
        this.loginDis = true
      },
      endLogin () {
        this.showLogin = false
        this.loginDis = false
      }
    }

  }
</script>
<style lang="less">
    .vux-demo {
        text-align: center;
    }
    .a-right {
        float: right;
    }
    .logo {
        width: 100px;
        height: 100px
    }
</style>
