<template>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../assets/vux_logo.png">
            <h1></h1>
        </div>
        <group class="weui-cells_form">
            <x-input placeholder="手机号" is-type="china-mobile" type="tel" v-model="phone" ref="refPhone" :required="true"></x-input>
            <x-input placeholder="密码(6-18位)" :min="6" :max="18" type="password" v-model="password" ref="refPassword"
                     :required="true"></x-input>
            <x-input placeholder="验证码" type="number" :min="6" :max="6" class="weui-vcode" v-model="code" ref="refCode"
                     :required="true">
                <x-button slot="right" :gradients="['#4b4b4b', '#7d7d7d']" mini :show-loading="showCode"
                          :disabled="sendCodeDis" @click.native="sendCode">
                    <countdown v-model="timeSendCode" :start="startTime" @on-finish="finishTime"
                               v-show="showTime"></countdown>
                    {{sendCodeText}}
                </x-button>
            </x-input>
        </group>
        <box gap="20px 10px">
            <x-button :gradients="['#4b4b4b', '#7d7d7d']" :show-loading="showRegister" @click.native="register">注册
            </x-button>
        </box>
        <box gap="0px 10px">
            <router-link :to="{ path: '/login'}"><p>已有账号?去登录...</p></router-link>
        </box>
    </div>
</template>
<script>
  import {Group, Box, XInput, XButton, Countdown} from 'vux'
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
        showRegister: false,
        showCode: false,
        sendCodeText: '发送验证码',
        sendCodeDis: false,
        timeSendCode: 5,
        startTime: false,
        showTime: false
      }
    },
    methods: {
      sendCode () {
        let _this = this
        if (this.phone === '' || !this.$refs.refPhone.valid) {
          this.$refs.refPhone.focus()
          this.$vux.toast.text('请正确填写手机号', 'bottom')
          return
        }
        requsetHandle.get('/home/sms/send', {phone: this.phone}).then(function (response) {
          response = requsetHandle.handleRespons(response, _this)
          if (response.status === 1) {
            _this.sendCodeDis = true
            _this.sendCodeText = '秒后重发'
            _this.startTime = true
            _this.showTime = true
          } else {
            _this.$vux.toast.text(response.info)
          }
        }).catch(function (error) {
          console.log(error)
          requsetHandle.handleError(error, _this)
        })
      },
      register (e) {
        console.log(e)
      },
      finishTime () {
        this.sendCodeDis = false
        this.sendCodeText = '发送验证码'
        this.timeSendCode = 5
        this.startTime = false
        this.showTime = false
      }
    }

  }
</script>
<style>
    .vux-demo {
        text-align: center;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
