<template>
    <div id="app"  style="height:100%;">

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-transfer-dom>
         <actionsheet :menus="actionsheetMenus" :show-cancel="true" v-model="showActionsheet" @on-click-menu="clickActionsheet"></actionsheet>
        </div>

        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px" v-on:changeHeader="updateHeader" >
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
            <tabbar-item badge="2" link="/me">
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
      wechatShare () {
        let _this = this
        requsetHandle.get('/api/wechat/jssdk', {url: window.location.href}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          console.log(data)
          _this.$wechat.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appid, // 必填，公众号的唯一标识
            timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          _this.$wechat.ready(function () {
            _this.$wechat.onMenuShareAppMessage({
              title: '互联网之子',
              desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                console.log('用户点击发送给朋友')
              },
              success: function (res) {
                console.log('已分享')
              },
              cancel: function (res) {
                console.log('已取消')
              },
              fail: function (res) {
                console.log(JSON.stringify(res))
              }
            })
            _this.$wechat.onMenuShareTimeline({
              title: '互联网之子',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                console.log('用户点击分享到朋友圈')
              },
              success: function (res) {
                console.log('已分享')
              },
              cancel: function (res) {
                console.log('已取消')
              },
              fail: function (res) {
                console.log(JSON.stringify(res))
              }
            })
          })
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
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
        if (e === 'feedback') {
          this.$router.push('/feedback')
        }
      },
      updateHeader (e) {
        if (e.headerTitle) {
          this.headerTitle = e.headerTitle
        }
        if (e.actionsheetMenus) {
          this.actionsheetMenus = e.actionsheetMenus
        }
        if (e.clickActionsheet) {
          this.clickActionsheet = e.clickActionsheet
        }
        if (e.isShowBack !== undefined) {
          this.isShowBack = e.isShowBack
        }
        if (e.isShowMore !== undefined) {
          this.isShowMore = e.isShowMore
        }
      }
    },
    created: function () {
      // console.log(this.client)
    },
    mounted: function () {
      if (this.$store.state.jeemu.isWechat) {
        this.wechatShare()
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.jeemu.isLoading
      }),
      tabbarShow () {
        let notPath = ['/register', '/login', '/feedback']
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
        let showPath = ['/asss']
        let i = showPath.length
        while (i--) {
          let temp = new RegExp(showPath[i])
          if (temp.test(this.$route.path)) {
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style lang="less">
    @import './styles/reset.less';
    @import './styles/my.less';
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
