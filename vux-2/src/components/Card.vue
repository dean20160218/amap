<template>
    <div>
        <p style="text-align:center;" v-show="loading">
            <br>
            <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span><inline-loading></inline-loading>
        </p>
        <div v-for="value in oil_list">
        <card :header="{title: value.name}" :footer="{title: '查看详情', link: '/img?id='+value.id}" >
            <img slot="header" v-bind:src="value.head_img_url" style="width:100%;display:block;">
            <div slot="content" class="card-padding">
                <p style="color:#999;font-size:12px;">{{value.author}} - {{value.publish_time}}</p>
                <p style="font-size:14px;line-height:1.2;">{{value.content}}</p>
            </div>
        </card>
        <divider>--</divider>
        </div>
    </div>
</template>
<script>
  import { Divider, Card, InlineLoading } from 'vux'
  import requsetHandle from '../request/main'
  export default {
    directives: {
      // TransferDom
    },
    components: {
      Divider,
      Card,
      InlineLoading
    },
    data () {
      return {
        link: {title: '查看详情', link: '/img?id=22'},
        loading: false,
        oil_list: []
      }
    },
    mounted () {
      this.getOilList()
    },
    methods: {
      getOilList () {
        let _this = this
        _this.showLoading()
        requsetHandle.get('/api/oil/list').then(function (response) {
          _this.hideLoading()
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.oil_list = data.data
          }
        }).catch(function (error) {
          _this.hideLoading()
          requsetHandle.handleError(error, _this)
        })
      },
      changeImg (index) {
        console.log(index)
      },
      clickImg () {
        console.log(this.imgIndex)
        this.$refs.previewer.show(this.imgIndex)
      },
      showLoading () {
        this.loading = true
      },
      hideLoading () {
        this.loading = false
      }
    }
  }
</script>
<style scoped lang="less">
    @import '../styles/1px.less';
    .card-demo-flex {
        display: flex;
    }
    .card-demo-content01 {
        padding: 10px 0;
    }
    .card-padding {
        padding: 15px;
    }
    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .card-demo-flex span {
        color: #f74c31;
    }
</style>
