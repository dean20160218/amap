// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import Client from './main/client'
import User from './main/user'

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
    isLoading: false,
    isWechat: Client.isWechat(),
    isIos: Client.isIos(),
    isAndroid: Client.isAndroid()
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
    },
    updateIsLoginStatus (state, login) {
      state.isLogin = login.isLogin
    }
  },
  actions: {
    checkLogin (context) {
      User.isLogin().then(function (response) {
        if (response.data.data[0]) {
          context.commit('updateIsLoginStatus', {isLogin: true})
        }
      })
    }
  }
})

router.beforeEach(function (to, from, next) {
  /*
  if (store.state.jeemu.isLogin === false) {
    if (User.isLoginPath(to.path)) {
      User.isLogin().then(function (response) {
        if (response.data.data[0] === false) {
          User.getLoginUrl(store.state.jeemu.isWechat, to.path).then(function (response) {
            if (response.data.data.type === 'push') {
              router.push(response.data.data.url)
            } else {
              window.location.href = response.data.data.url
              // router.go(response.data.data.url)
            }
          })
        } else {
          store.commit('updateIsLoginStatus', {isLogin: true})
          store.commit('updateLoadingStatus', {isLoading: true})
          next()
        }
      })
    }
    return
  }
  */
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  /*
  if (store.state.jeemu.isWechat && store.state.jeemu.isIos) {
    document.setTitle = function (t) {
      document.title = t
      var i = document.createElement('iframe')
      i.src = '/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
    }
    console.log('wechar')
    document.body.appendChild(to.name + ' - 史迹')
  } else {
    document.title = to.name + ' - 史迹'
  }
  */
  document.title = to.name + ' - 史迹'
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
