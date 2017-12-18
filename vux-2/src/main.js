// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
// import AMap from 'vue-amap'

// import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import router from './router/index'
import { AjaxPlugin, WechatPlugin, ToastPlugin } from 'vux'
// Vue.use(VueRouter)

/*
 const routes = [{
 path: '/',
 component: Home
 }]

 const router = new VueRouter({
 routes
 })
 */
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
// Vue.use(AMap)
/*
AMap.initAMapApiLoader({
  key: 'b9163fde27dc5d66906d413a84942298',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation']
})
*/

Vue.use(Vuex)
const store = new Vuex.Store({}) // 这里你可能已经有其他 module
store.registerModule('jeemu', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      if (!payload.isLoading) {
        setTimeout(
          function () {
            state.isLoading = payload.isLoading
            // console.log(2)
          }, 1000
        )
      } else {
        state.isLoading = payload.isLoading
      }
    }
  }
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

FastClick.attach(document.body)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
