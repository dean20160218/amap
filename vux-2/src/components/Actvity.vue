<template>
    <div>
        <div style="margin: 10px;overflow: hidden;" v-for="item in list1">
            <router-link :to="{ path: '/', params: { userId: 123 }}">
            <masker style="border-radius: 2px;">
                <div class="m-img" :style="{backgroundImage: 'url(' + item.bg_img + ')'}"></div>
                <div slot="content" class="m-title">
                    {{item.name}}
                    <br/>
                    <span class="m-time">{{item.start_time}}-{{item.end_time}}</span>
                </div>
            </masker>
            </router-link>
    </div>
    </div>
</template>

<script>
  import { XButton, Masker } from 'vux'
  export default {
    components: {
      XButton,
      Masker
    },
    data () {
      return {
        list: [{
          title: '洗颜新潮流！人气洁面皂排行榜',
          img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
        }, {
          title: '远离车内毒气，日本车载空气净化器精选',
          img: 'http://n2-q.mafengwo.net/s10/M00/AF/8B/wKgBZ1h5gpCAANq8AAJzqrujmc815.jpeg?imageView2%2F2%2Fw%2F600%2Fh%2F600%2Fq%2F90'
        }],
        list1: []
      }
    },
    created: function () {
      let than = this
      than.getList(1).then(function (respons) {
        than.list1 = respons.data.data
      })
    },
    methods: {
      getList (pageNum, pageSize = 10) {
        return this.$http({
          method: 'get',
          url: 'https://www.yaf.com',
          params: {
            pageSize: pageSize,
            pageMum: pageNum
          }
        })
      }
    }
  }
</script>

<style lang="less">
    .m-img {
        padding-bottom: 33%;
        display: block;
        position: relative;
        max-width: 100%;
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        border-radius: 2px;
    }

    .m-title {
        color: #fff;
        text-align: center;
        text-shadow: 0 0 2px rgba(0, 0, 0, .5);
        font-weight: 500;
        font-size: 16px;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
    }

    .m-time {
        font-size: 12px;
        padding-top: 4px;
        border-top: 1px solid #f0f0f0;
        display: inline-block;
        margin-top: 5px;
    }
</style>