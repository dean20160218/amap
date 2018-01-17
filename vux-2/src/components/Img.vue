<template>
    <div>
        <swiper :list="swiper_list" class="previewer-demo-img" v-model="imgIndex" @on-index-change="changeImg" :auto="true"
                @click.native="clickImg"></swiper>
        <div v-transfer-dom>
            <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
        </div>
        <group gutter="0px">
            <cell title="名称XXX" value="作者XXX"></cell>
            <cell-form-preview :list="attributes_list"></cell-form-preview>
            <cell title="" value="查看更多" :is-link="true" v-show="more_attributes.length > 3" @click.native="clickAttributesFunction"></cell>
        </group>
        <group gutter="0px">
            <cell title="评分" @click.native="handleRates">
                <rater v-model="scoreData" :disabled="true" star="☻" active-color="#FF9900" :margin="4"></rater>
            </cell>
        </group>
        <jeemu-comment></jeemu-comment>
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
                        <cell title="我的评分">
                            <rater v-model="user_score.score" :disabled="user_score.exist === true" star="☻" active-color="#FF9900"
                                   :margin="4"></rater>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" :disabled="user_score.exist === true"  :show-loading="score_commit_show_loading" @click.native="submitScoreFunction">{{user_score.exist === true ? '已提交':'提交'}}</x-button>
                        <x-button @click.native="showRates = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <tabbar style="position: fixed" v-show="true">
            <tabbar-item @click.native="clickFocus">
                <jeemu-focus  slot="icon" :targetId="imgId" ref="focus"></jeemu-focus>
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
        <div v-transfer-dom>
            <popup v-model="show_attributes" position="bottom" max-height="50%">
                <group>
                    <cell v-for="i in more_attributes" :key="i.key" :value="i.value" :title="i.key"></cell>
                </group>
                <div style="padding: 15px;">
                    <x-button @click.native="show_attributes = false" :gradients="['#4b4b4b', '#7d7d7d']" type="primary">关闭</x-button>
                </div>
            </popup>
        </div>
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
  import JeemuComment from './comment/comment.vue'
  import requsetHandle from '../request/main'
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
      'jeemu-focus': JeemuFocus,
      'jeemu-comment': JeemuComment
    },
    data () {
      return {
        swiper_list: [],
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
        attributes_list: [],
        scoreData: 0,
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
        imgId: parseInt(this.$route.query.id),
        user_score: {
          score: 0,
          exist: false
        },
        score_commit_show_loading: false,
        show_attributes: false,
        more_attributes: []
      }
    },
    mounted () {
      this.getImgList()
      this.initHeader()
      this.initOilFunction()
    },
    methods: {
      getImgList () {
      },
      changeImg (index) {
        // console.log(index)
      },
      clickImg () {
        console.log(this.imgIndex)
        this.$refs.previewer.show(this.imgIndex)
      },
      initOilFunction () {
        let _this = this
        requsetHandle.get('/api/oil/detail', {id: _this.imgId}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.scoreData = data.data.score
            _this.user_score.score = data.data.user_score.score
            _this.user_score.exist = data.data.user_score.exist
            data.data.attributes.forEach(function (value) {
              if (_this.attributes_list.length < 3) {
                _this.attributes_list.push({label: value.key, value: value.value})
              }
              _this.more_attributes.push(value)
            })
            for (let value in data.data.images) {
              _this.swiper_list.push({img: data.data.images[value].swiper_url, title: data.data.images[value].title, fallbackImg: _this.static.resHost + '/static/images/error_200x200.svg'})
              _this.previewerList.push({src: data.data.images[value].previewer_url, title: data.data.images[value].content})
            }
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
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
        // this.isFocus = !this.isFocus
        this.$refs.focus.updateFocus()
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
      },
      submitScoreFunction () {
        let _this = this
        if (_this.user_score.score === 0) {
          this.$vux.toast.text('评分不能为零哦！', 'bottom')
          return
        }
        _this.startSubmitScore()
        requsetHandle.post('/api/score/setScore', {oil_id: _this.imgId, score: _this.user_score.score}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.refreshScoreFuntion()
          } else {
            _this.user_score.exist = false
          }
          _this.endSubmitScore()
        }).catch(function (error) {
          _this.endSubmitScore()
          _this.user_score.exist = false
          requsetHandle.handleError(error, _this)
        })
      },
      refreshScoreFuntion () {
        let _this = this
        requsetHandle.get('/api/score/getScore', {oil_id: _this.imgId}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.scoreData = data.data[0]
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      startSubmitScore () {
        this.score_commit_show_loading = true
        this.user_score.exist = true
      },
      endSubmitScore () {
        this.score_commit_show_loading = false
        // this.user_score.exist = true
      },
      clickAttributesFunction () {
        this.show_attributes = true
      }
    },
    computed: {
      haoMenus () {
        return [{label: '购买?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>', type: this.canBuy ? 'Default' : 'disabled', value: 'buy'}, {label: '仿制?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>', type: this.canCopy ? 'Default' : 'disabled', value: 'copy'}]
      }
    }
  }
</script>
