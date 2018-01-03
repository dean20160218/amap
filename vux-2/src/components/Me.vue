<template>
    <div>
        <blur :blur-amount=40 :url="userInfo.headImg">
            <vue-core-image-upload
                    inputOfFile='file'
                    :crop="crop"
                    @imageuploaded="imageuploaded"
                    :data="data"
                    :max-file-size="5242880"
                    url="https://www.shiji.com/api/file/uploadImg">
                <p class="center">
                    <x-img :src="userInfo.headImg" :default-src="userInfo.headImg" error-class="error-loading-img"></x-img>
                </p>
            </vue-core-image-upload>
            <div class="center">
                <h4 class="vux-notice">{{userInfo.nick}}</h4>
            </div>
        </blur>
        <group :gutter="0">
        <cell title="Live Demo" link="/demo">
            <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        </cell>
        <cell title="Github" link="http://github.com/airyland/vux" value="Star me">
            <span class="demo-icon" slot="icon" style="color:#35495e;">&#xe62f;</span>
        </cell>
        </group>
    </div>
</template>
<script>
  import {Panel, Group, XImg, Cell, Blur} from 'vux'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import requsetHandle from '../request/main'
  export default {
    components: {
      VueCoreImageUpload,
      XImg,
      Panel,
      Group,
      Cell,
      Blur
    },
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png',
        data: {},
        crop: 'local',
        userInfo: {nick: '', headImg: ''}
      }
    },
    created: function () {
      this.getUSerInfo()
    },
    mounted () {
      this.initHeader()
    },
    methods: {
      initHeader () {
        let e = {
          headerTitle: '我',
          actionsheetMenus: {
            business: '商务合作',
            share: '分享朋友圈',
            feedback: '意见反馈'
          }
        }
        this.$parent.$emit('changeHeader', e)
      },
      getUSerInfo () {
        let _this = this
        requsetHandle.get('/api/user/userInfo').then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.userInfo.nick = data.data.nick
            _this.userInfo.headImg = data.data.headImg
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      imageuploaded (data) {
        console.log(data)
        //
      }
    }
  }
</script>

<style scoped>
    .center {
        margin-top: 15px;
        text-align: center;
    }

    .center img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #ececec;
    }

    .vux-notice {
        color: #666;
        line-height: 40px;
    }
</style>


