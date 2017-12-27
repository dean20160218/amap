import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import From from '../components/HelloFromVux.vue'
// import Amap from '../components/Amap.vue'
import Act from '../components/Actvity.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

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
    {
      path: '/login',
      name: '注册',
      component: Login
    },
    {
      path: '/act',
      name: '活动',
      component: Act
    }
  ]
})
