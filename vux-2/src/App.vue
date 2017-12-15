<template>
    <div id="app">
        <loading v-model="isLoading"></loading>
        <router-view class="router-view"></router-view>
        <tabbar style="position: fixed">
            <tabbar-item selected link="/">
                <img slot="icon" src="./styles/jeemu/icon/history_1.png">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/act">
                <img slot="icon">
                <span slot="label">活动</span>
            </tabbar-item>
            <tabbar-item badge="2" link="/form">
                <img slot="icon" >
                <span slot="label">我</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
  import { Loading, Tabbar, TabbarItem } from 'vux'
  import { mapState } from 'vuex'
  import requsetHandle from './request/main'
  export default {
    name: 'app',
    data () {
      return {
        http: this.$http
      }
    },
    components: {
      Loading,
      Tabbar,
      TabbarItem
    },
    methods: {
      ajax (val) {
        return this.$http({
          method: 'post',
          url: 'http://www.yaf.com/home/request/index',
          data: {
            id: val
          }
            /*
             params: {
             id: '2'
             }
             */
        })
      }
    },
    mounted: function () {
      this.ajax(2).then(function (response) {
        requsetHandle.init(response)
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    computed: {
      ...mapState({
        isLoading: state => state.jeemu.isLoading
      })
    }
  }
</script>

<style lang="less">
    @import './styles/reset.less';

    body {
        background-color: #fbf9fe;
    }
    .router-view {
        width: 100%;
        top: 46px;
    }
</style>
