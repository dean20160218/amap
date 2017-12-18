import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import From from '../components/HelloFromVux.vue'
// import Amap from '../components/Amap.vue'
import Act from '../components/Actvity.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Form',
      name: 'Form',
      component: From
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/act',
      name: 'Act',
      component: Act
    }
  ]
})
