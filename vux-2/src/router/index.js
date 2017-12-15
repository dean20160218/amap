import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import From from '../components/HelloFromVux.vue'
import Amap from '../components/Amap.vue'
import Act from '../components/Actvity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Form',
      name: 'Form',
      component: From
    },
    {
      path: '/Amap',
      name: 'Amap',
      component: Amap
    },
    {
      path: '/act',
      name: 'Act',
      component: Act
    }
  ]
})
