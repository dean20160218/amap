<template>
    <div id="app"  style="height:100%;">

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-transfer-dom>
         <actionsheet :menus="actionsheetMenus" :show-cancel="true" v-model="showActionsheet" @on-click-menu="clickActionsheet"></actionsheet>
        </div>

        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
            <x-header v-show="headerShow" :left-options="{showBack: isShowBack}" :right-options="{showMore: isShowMore}" @on-click-more="headerMore" style="width:100%;position:absolute;left:0;top:0;z-index:100;">{{headerTitle}}</x-header>
            <transition>
            <router-view class="router-view"></router-view>
            </transition>
        <tabbar style="position: fixed" v-show="tabbarShow">
            <tabbar-item selected link="/" :selected="$route.path === '/'">
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
        </view-box>
    </div>
</template>

<script>
  import { Loading, Tabbar, TabbarItem, XHeader, TransferDom, Actionsheet, ViewBox } from 'vux'
  import { mapState } from 'vuex'
  import requsetHandle from './request/main'
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Actionsheet,
      Loading,
      Tabbar,
      TabbarItem,
      XHeader,
      ViewBox
    },
    data () {
      return {
        headerTitle: '史迹',
        isShowBack: false,
        isShowMore: true,
        actionsheetMenus: {
          'business': '商务合作',
          'share': '分享到朋友圈'
        },
        showActionsheet: false,
        bodyPaddingTop: '46px'
        // tabbarShow: true
      }
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
      },
      headerMore () {
        this.showActionsheet = true
      },
      onClickingMask () {
        console.log(1)
      },
      clickActionsheet (e) {
        console.log(e)
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
      }),
      tabbarShow () {
        let notPath = ['/register', '/login']
        let i = notPath.length
        while (i--) {
          let temp = new RegExp(notPath[i])
          if (temp.test(this.$route.path)) {
            return false
          }
        }
        return true
      },
      headerShow () {
        let showPath = ['/act', '/my']
        let i = showPath.length
        while (i--) {
          let temp = new RegExp(showPath[i])
          if (temp.test(this.$route.path)) {
            return true
          }
        }
        return false
      }
    }
  }
</script>

<style lang="less">
    @import './styles/reset.less';
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    body {
        background-color: #fbf9fe;
    }
    .router-view {
        width: 100%;
        top: 46px;
    }
</style>
