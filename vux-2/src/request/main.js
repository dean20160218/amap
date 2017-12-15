/**
 * Created by JeemuZhou on 2017/12/14.
 */
export default {
  init (response) {
    if (response.data.status === 302) {
      console.log(2)
    } else if (response.data.status === 1) {
      console.log(1)
    } else {
      console.log(3)
    }
  }
}
