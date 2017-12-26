/**
 * Created by JeemuZhou on 2017/12/14.
 */
import {AjaxPlugin} from 'vux'
// AjaxPlugin.defaults.withCredentials = true
let baseUrl = 'https://www.shiji.com'
export default {
  handleRespons (response, Vue) {
    let data = response.data
    if (data.status === 302) {
      this.get('/api/user/getLoginUrl', {path: Vue.$route.path}).then(function (response) {
        if (response.data.data.type === 'push') {
          Vue.$vux.confirm.show({
            title: '提示',
            content: '前去登录?',
            theme: 'android',
            onShow () {
              // console.log('plugin show')
            },
            onHide () {
              // console.log('plugin hide')
            },
            onCancel () {
              console.log('plugin cancel')
            },
            onConfirm () {
              Vue.$router.push(response.data.data.url)
            }
          })
          //
        } else {
          window.location.href = response.data.data.url
          // router.go(response.data.data.url)
        }
      })
      return false
    } else if (data.status === 1) {
      return data
    } else if (data.status === -1) {
      Vue.$vux.toast.show({
        type: 'warn',
        position: 'top',
        text: data.msg
      })
      return false
    } else if (data.status === 0) {
      Vue.$vux.toast.show({
        type: 'cancel',
        position: 'top',
        text: data.info
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
      withCredentials: true
    })
  },
  handleError (error, Vue) {
    Vue.$vux.toast.show({
      type: 'warn',
      position: 'top',
      text: error.message
    })
  }
}
