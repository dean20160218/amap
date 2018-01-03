<template>
<div>
    <blur :blur-amount=40 :url="src">
        <p class="center">  <x-img :src="src" :offset="-100"></x-img></p>
        <div class="center">
            <h4 class="vux-notice">11122</h4>
        </div>
    </blur>

        <cell title="Live Demo" link="/demo">
            <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        </cell>
        <cell title="Github" link="http://github.com/airyland/vux" value="Star me">
            <span class="demo-icon" slot="icon" style="color:#35495e;">&#xe62f;</span>
        </cell>
    <vue-core-image-upload
            :text = "'111'"
            inputOfFile='file'
            :crop="crop"
            @imageuploaded="imageuploaded"
            :data="data"
            :max-file-size="5242880"
            url="https://www.shiji.com/api/file/uploadImg" >
    </vue-core-image-upload>
</div>
</template>
<script>
  import { Panel, Group, XImg, Cell, Blur } from 'vux'
  import VueCoreImageUpload from 'vue-core-image-upload'
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
        userInfo: {nick: '', headImg: 'http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png'}
      }
    },
    created: function () {

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


