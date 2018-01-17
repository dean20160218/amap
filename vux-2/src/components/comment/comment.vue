<template>
<div>
    <divider>评论</divider>
    <tab :line-width="2" >
        <tab-item selected @on-item-click="changeTabFuntion">按热度</tab-item>
        <tab-item @on-item-click="changeTabFuntion">按时间</tab-item>
    </tab>
    <group gutter="0px">
        <p style="text-align:center;" v-show="show_loading">
            <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span><inline-loading></inline-loading>
        </p>
        <panel :list="comment_list" type="5"></panel>
    </group>
    <div v-transfer-dom>
        <popup v-model="show_comment" height="310px" is-transparent>
            <div style="width: 95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding-top:10px;">
                <group>
                    <cell>
                        <x-textarea :max="200" name="comment" placeholder="输入评论"></x-textarea>
                    </cell>
                </group>
                <div style="padding:20px 15px;">
                    <x-button type="primary">提交</x-button>
                    <x-button @click.native="show_comment = false">取消</x-button>
                </div>
            </div>
        </popup>
    </div>
</div>
</template>
<script>
  import { TransferDom, Group, Divider, Tab, TabItem, Popup, Cell, XTextarea, XButton, Panel, InlineLoading } from 'vux'
  import requsetHandle from '../../request/main'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Divider,
      Tab,
      TabItem,
      Popup,
      Cell,
      XTextarea,
      XButton,
      Panel,
      InlineLoading
    },
    props: {
      target_id: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: 'oil'
      }
    },
    data () {
      return {
        comment_list: [{
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
        show_comment: false,
        show_loading: false
      }
    },
    mounted: function () {
      this.initCommentFunction()
    },
    methods: {
      changeTabFuntion (e) {
        console.log(e)
      },
      initCommentFunction () {
        if (this.target_id === 0) {
          console.log(this)
          return
        }
        let _this = this
        _this.show_loading = true
        requsetHandle.get('/api/comment/oil', {oil_id: _this.target_id}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          _this.show_loading = false
          if (data.status === 1) {
            for (let value in data.data) {
              _this.comment_list.push({src: data.data[value].head_img, title: data.data[value].nick, desc: data.data[value].content})
            }
            console.log(data.data)
          }
        }).catch(function (error) {
          _this.show_loading = false
          requsetHandle.handleError(error, _this)
        })
      }
    }
  }
</script>
<style>

</style>
