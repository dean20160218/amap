/**
 * Created by JeemuZhou on 2017/12/14.
 */
import { AjaxPlugin } from 'vux'
// AjaxPlugin.defaults.withCredentials = true
let baseUrl = 'https://www.shiji.com'
// let baseUrl = 'http://192.168.2.105'
export default {
  handleRespons (response, Vue) {
    let _this = this
    let data = response.data
    if (data.status === 302) {
      if (data.data.url) {
        _this.handleRedirect(data, Vue)
      } else {
        this.get('/api/user/getLoginUrl', {path: Vue.$route.fullPath}).then(function (response) {
          _this.handleRedirect(response.data, Vue)
        })
      }
      return false
    } else if (data.status === 1) {
      return data
    } else if (data.status === -1) {
      Vue.$vux.toast.show({
        type: 'text',
        position: 'bottom',
        text: data.msg
      })
      return false
    } else if (data.status === 0) {
      Vue.$vux.toast.show({
        type: 'text',
        position: 'bottom',
        text: data.msg
      })
      return false
    }
    return false
  },

  get (url, param = {}) {
    return AjaxPlugin.$http({
      method: 'GET',
      url: baseUrl + url,
      params: param,
      withCredentials: true
    })
  },
  post (url, data = {}, param = {}) {
    return AjaxPlugin.$http({
      method: 'POST',
      url: baseUrl + url,
      params: param,
      data: data,
      timeout: 10000,
      withCredentials: true
    })
  },
  login (Vue, alert = 'alert') {
    let _this = this
    this.get('/api/user/getLoginUrl', {path: Vue.$route.fullPath, alert: alert}).then(function (response) {
      _this.handleRedirect(response.data, Vue)
    })
  },
  isLogin () {
    return this.get('/api/user/isLogin')
  },
  handleError (error, Vue) {
    Vue.$vux.toast.show({
      type: 'warn',
      position: 'top',
      timeout: 10000,
      text: error.message
    })
  },
  handleRedirect (data, Vue) {
    let _this = this
    if (data.data.alert === 'alert') {
      Vue.$vux.alert.show({
        title: '提示',
        content: data.msg,
        onShow () {
          // console.log('Plugin: I\'m showing')
        },
        onHide () {
          _this.handlePushOrGo(data.data, Vue)
        }
      })
    } else if (data.data.alert === 'confirm') {
      Vue.$vux.confirm.show({
        title: '提示',
        content: data.msg,
        theme: 'android',
        onShow () {
          // console.log('plugin show')
        },
        onHide () {
          // console.log('plugin hide')
        },
        onCancel () {
          // console.log('plugin cancel')
        },
        onConfirm () {
          _this.handlePushOrGo(data.data, Vue)
        }
      })
    } else {
      _this.handlePushOrGo(data.data, Vue)
    }
  },
  handlePushOrGo (data, Vue) {
    // return false
    if (data.type === 'push') {
      Vue.$router.push(data.url)
    } else {
      window.location.href = data.url
    }
  }
}
