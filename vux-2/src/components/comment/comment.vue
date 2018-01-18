<template>
    <div>
        <divider>评论</divider>
        <tab :line-width="2">
            <tab-item selected @on-item-click="changeTabFuntion">按热度</tab-item>
            <tab-item @on-item-click="changeTabFuntion">按时间</tab-item>
        </tab>
        <scroller lock-x @on-pulldown-loading="onScrollTop" @on-pullup-loading="onScrollTop" :use-pulldown="true"
                  :use-pullup="true" v-model="scroller_status">
            <div>
                <group gutter="0px">
                    <p style="text-align:center;" v-show="show_loading">
                        <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span>
                        <inline-loading></inline-loading>
                    </p>
                    <panel :list="comment_list" type="5" @on-click-praise="clickPraiseFunction"></panel>
                </group>
            </div>
        </scroller>
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
  import {
    TransferDom,
    Group,
    Divider,
    Tab,
    TabItem,
    Popup,
    Cell,
    XTextarea,
    XButton,
    Panel,
    InlineLoading,
    Scroller
  } from 'vux'
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
      InlineLoading,
      Scroller
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
        comment_list: [],
        show_comment: false,
        show_loading: false,
        tab_index: 0,
        scroller_status: {pullupStatus: 'default'}
      }
    },
    mounted: function () {
      this.initCommentFunction()
    },
    methods: {
      onScrollTop () {
        console.log(this.scroller_status)
        let _this = this
        setTimeout(function () {
          console.log(_this.scroller_status)
        }, 2000)
      },
      onScrollBottom (e) {
        console.log(111)
      },
      changeTabFuntion (e) {
        if (this.tab_index !== e) {
          this.tab_index = e
          this.comment_list = []
          this.initCommentFunction()
        }
      },
      initCommentFunction () {
        if (this.target_id === 0) {
          console.log(this)
          return
        }
        let _this = this
        _this.show_loading = true
        requsetHandle.get('/api/comment/oil', {
          oil_id: _this.target_id,
          order: _this.tab_index
        }).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          _this.show_loading = false
          if (data.status === 1) {
            for (let value in data.data) {
              _this.comment_list.push({
                src: data.data[value].head_img,
                title: data.data[value].nick,
                desc: data.data[value].content,
                meta: {
                  date: data.data[value].insert_time,
                  other: data.data[value].praise,
                  is_praise: data.data[value].user_praise.is_praise,
                  ext: {c_id: data.data[value].id, p_id: data.data[value].user_praise.id}
                }
              })
            }
          }
        }).catch(function (error) {
          _this.show_loading = false
          requsetHandle.handleError(error, _this)
        })
      },
      clickPraiseFunction (key) {
        this.comment_list[key].meta.is_praise = !this.comment_list[key].meta.is_praise
        let _this = this
        if (this.comment_list[key].meta.is_praise) {
          this.comment_list[key].meta.other = this.comment_list[key].meta.other + 1
          requsetHandle.get('/api/praise/praiseComment', {
            c_id: this.comment_list[key].meta.ext.c_id,
            p_id: this.comment_list[key].meta.ext.p_id
          }).then(function (response) {
            let data = requsetHandle.handleRespons(response, _this)
            if (data.status === 1) {
              _this.comment_list[key].meta.ext.p_id = data.data.id
            }
          }).catch(function (error) {
            requsetHandle.handleError(error, _this)
          })
        } else {
          this.comment_list[key].meta.other = this.comment_list[key].meta.other - 1
          requsetHandle.get('/api/praise/cancelComment', {p_id: this.comment_list[key].meta.ext.p_id}).then(function (response) {
            let data = requsetHandle.handleRespons(response, _this)
            if (data.status === 1) {
              _this.comment_list[key].meta.ext.c_id = data.data.c_id
            }
          }).catch(function (error) {
            requsetHandle.handleError(error, _this)
          })
        }
      }
    }
  }
</script>
<style>

</style>
