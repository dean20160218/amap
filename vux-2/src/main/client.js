/**
 * Created by JeemuZhou on 2017/12/20.
 */
export default {
  isWechat () {
    // let ua = navigator.userAgent.toLowerCase()
    if (/(MicroMessenger)/i.test(navigator.userAgent)) {
      return true
    }
    return false
  },
  isIos () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return true
    }
    return false
  },
  isAndroid () {
    if (/(Android)/i.test(navigator.userAgent)) {
      return true
    }
    return false
  }
}
