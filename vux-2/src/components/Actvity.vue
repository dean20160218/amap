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
  import {XButton, Masker} from 'vux'
  export default {
    components: {
      XButton,
      Masker
    },
    data () {
      return {
        title: 'test',
        list1: [1, 2]
      }
    },
    created: function () {
      // this.initHeader()
      // console.log(this.$parent.title = '活动')
    },
    mounted () {
      this.initHeader()
    },
    methods: {
      initHeader () {
        let e = {
          headerTitle: '活动',
          actionsheetMenus: {
            business: '商务合作',
            share: '分享朋友圈',
            test: '测试'
          }
        }
        this.$parent.$emit('changeHeader', e)
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