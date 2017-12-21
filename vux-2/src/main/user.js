/**
 * Created by admin on 2017/12/21.
 */
import requestHande from '../request/main'
let loginPath = [
  '/form'
]
export default {
  isLogin () {
    return requestHande.get('/api/user/isLogin')
  },
  getLoginUrl (isWechat) {
    return requestHande.get('/api/user/getLoginUrl', {isWechat: isWechat})
  },
  isLoginPath (path) {
    let i = loginPath.length
    while (i--) {
      let temp = new RegExp(loginPath[i])
      if (temp.test(path)) {
        return true
      }
    }
    return false
  }
}
