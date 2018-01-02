import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import From from '../components/HelloFromVux.vue'
// import Amap from '../components/Amap.vue'
import Act from '../components/Actvity.vue'
import Register from '../components/Register.vue'
// import Login from '../components/Login.vue'
import Me from '../components/Me.vue'
import Feedback from '../components/Feedback.vue'
import Img from '../components/Img.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/Form',
      name: '表单',
      component: From
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    /*
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    */
    {
      path: '/act',
      name: '活动',
      component: Act
    },
    {
      path: '/me',
      name: '我',
      component: Me
    },
    {
      path: '/feedback',
      name: '意见反馈',
      component: Feedback
    },
    {
      path: '/img',
      name: '详情',
      component: Img
    }
  ]
})
