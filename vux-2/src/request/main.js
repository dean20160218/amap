/**
 * Created by JeemuZhou on 2017/12/14.
 */
import {AjaxPlugin} from 'vux'
let baseUrl = 'https://www.yaf.com'
export default {
  init (response) {
    if (response.data.status === 302) {
      console.log(2)
    } else if (response.data.status === 1) {
      console.log(1)
    } else {
      console.log(3)
    }
  },
  handleRespons (response, Vue) {
    let data = response.data
    let than = this
    if (data.status === 302) {
      Vue.$router.push({path: data.data})
    } else if (data.status === 1) {
      Vue.$vux.toast.text(data.info, 'top')
    } else {
      console.log(than)
    }
    return data.data
  },

  get (url, param = {}) {
    return AjaxPlugin.$http({
      method: 'GET',
      url: baseUrl + url,
      params: param
    })
  }
}
