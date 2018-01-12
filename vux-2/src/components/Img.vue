<template>
    <div>
        <swiper :list="img_list" class="previewer-demo-img" v-model="imgIndex" @on-index-change="changeImg" :auto="true"
                @click.native="clickImg"></swiper>
        <div v-transfer-dom>
            <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
        </div>
        <group gutter="0px">
            <cell title="名称XXX" value="作者XXX"></cell>
            <cell-form-preview :list="list"></cell-form-preview>
        </group>
        <group gutter="0px">
            <cell title="评分" @click.native="handleRates">
                <rater v-model="scoreData" :disabled="true" star="☻" active-color="#FF9900" :margin="4"></rater>
            </cell>
        </group>
        <group gutter="0px">
            <panel :list="commentList" type="5"></panel>
        </group>
        <div v-transfer-dom>
            <popup v-model="showComment" height="310px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <cell>
                            <x-textarea :max="200" name="comment" placeholder="输入评论"></x-textarea>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary">提交</x-button>
                        <x-button @click.native="showComment = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="showRates" height="220px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:200px;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <cell title="评分">
                            <rater v-model="scoreData" :disabled="false" star="☻" active-color="#FF9900"
                                   :margin="4"></rater>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary">提交</x-button>
                        <x-button @click.native="showRates = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <tabbar style="position: fixed" v-show="true">
            <tabbar-item @click.native="clickFocus">
                <img slot="icon"
                     :src="this.static.resHost + (realFocus?'/static/images/icon/focus_1.png':'/static/images/icon/focus_0.png')">
                <span slot="label">收藏</span>
            </tabbar-item>
            <tabbar-item @click.native="clickComment">
                <span slot="label">评论</span>
            </tabbar-item>
            <tabbar-item style="background-color: #4c4242" @click.native="clickHao">
                <span slot="label" style="font-size:16px;color: white">我喜欢？</span>
            </tabbar-item>
        </tabbar>
        <actionsheet v-model="showHao" :menus="haoMenus" show-cancel @on-click-menu="handleClickHao"></actionsheet>
        <jeemu-focus @focusResult="focusResult" :targetId="imgId" :isFocus="isFocus"></jeemu-focus>
    </div>
</template>
<script>
  import {
    Swiper,
    SwiperItem,
    XButton,
    Previewer,
    TransferDom,
    Group,
    Cell,
    CellFormPreview,
    Rater,
    Popup,
    XTextarea,
    Panel,
    Tabbar,
    TabbarItem,
    Actionsheet
  } from 'vux'
  import JeemuFocus from './focus/focus.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      XButton,
      Previewer,
      Group,
      Cell,
      CellFormPreview,
      Rater,
      Popup,
      XTextarea,
      Panel,
      Tabbar,
      TabbarItem,
      Actionsheet,
      'jeemu-focus': JeemuFocus
    },
    data () {
      return {
        img_list: [],
        previewerList: [],
        imgIndex: 0,
        options: {
          shareEl: true,
          shareButtons: [
            {id: 'facebook', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
            {id: 'twitter', label: 'Tweet', url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
            {
              id: 'pinterest',
              label: 'Pin it',
              url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'
            },
            {id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true}
          ]
        },
        list: [{
          label: '尺寸',
          value: '3.29 * 253'
        }, {
          label: 'Banana',
          value: '1.04'
        }, {
          label: 'Fish',
          value: '8.00'
        }],
        scoreData: 4,
        showComment: false,
        showRates: false,
        isFocus: false,
        realFocus: false,
        commentList: [{
          src: 'http://somedomain.somdomain/x.jpg',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          meta: {
            source: '来源信息',
            date: '时间',
            other: '其他信息'
          }
        }],
        canBuy: false,
        canCopy: true,
        showHao: false,
        imgId: parseInt(this.$route.query.id)
      }
    },
    mounted () {
      this.getImgList()
      this.initHeader()
    },
    methods: {
      getImgList () {
        this.img_list = [{
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行',
          fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }]
        this.previewerList = [
          {
            src: 'http://res.shiji.com/file/2018/01/08/PilEk/5a5334d864b70.jpg',
            title: '标题<br>ff',
            author: 'woziji'
          },
          {src: 'https://static.vux.li/demo/2.jpg'},
          {src: 'https://static.vux.li/demo/3.jpg'}
        ]
      },
      changeImg (index) {
        // console.log(index)
      },
      clickImg () {
        console.log(this.imgIndex)
        this.$refs.previewer.show(this.imgIndex)
      },
      handleRates () {
        this.showRates = true
      },
      clickHao () {
        this.showHao = true
      },
      clickComment () {
        this.showComment = true
      },
      clickFocus () {
        this.isFocus = !this.isFocus
      },
      handleClickHao (e) {
        console.log(e)
      },
      initHeader () {
        let e = {
          headerTitle: '详情',
          isShowBack: true
        }
        this.$parent.$emit('changeHeader', e)
      },
      focusResult (e) {
        if (e) {
          this.isFocus = true
        } else {
          this.isFocus = false
        }
        this.realFocus = this.isFocus
      }
    },
    computed: {
      haoMenus () {
        return [{label: '购买?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>', type: this.canBuy ? 'Default' : 'disabled', value: 'buy'}, {label: '仿制?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>', type: this.canCopy ? 'Default' : 'disabled', value: 'copy'}]
      }
    }
  }
</script>
