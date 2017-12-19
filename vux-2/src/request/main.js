/**
 * Created by JeemuZhou on 2017/12/14.
 */
import {AjaxPlugin} from 'vux'
let baseUrl = 'https://www.shiji.com'
export default {
  handleRespons (response, Vue) {
    let data = response.data
    if (data.status === 302) {
      Vue.$router.push({path: data.data[0]})
      return false
    } else if (data.status === 1) {
      return data
    } else if (data.status === -1) {
      Vue.$vux.toast.show({
        type: 'warn',
        position: 'top',
        text: data.info
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
      params: param
    })
  },
  post (url, data = {}, param = {}) {
    return AjaxPlugin.$http({
      method: 'POST',
      url: baseUrl + url,
      params: param,
      data: data
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
