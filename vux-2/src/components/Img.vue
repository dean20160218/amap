<template>
    <div>
        <swiper :list="img_list" class="previewer-demo-img" v-model="imgIndex" @on-index-change="changeImg" :auto="true"
                @click.native="clickImg"></swiper>
        <div v-transfer-dom>
            <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
        </div>
    </div>
</template>
<script>
  import { Swiper, SwiperItem, XButton, Previewer, TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      XButton,
      Previewer
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
        }
      }
    },
    mounted () {
      this.getImgList()
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
            src: 'https://static.vux.li/demo/1.jpg',
            title: '标题<br>ff',
            author: 'woziji'
          },
          {src: 'https://static.vux.li/demo/2.jpg'},
          {src: 'https://static.vux.li/demo/3.jpg'}
        ]
      },
      changeImg (index) {
        console.log(index)
      },
      clickImg () {
        console.log(this.imgIndex)
        this.$refs.previewer.show(this.imgIndex)
      }
    }
  }
</script>
