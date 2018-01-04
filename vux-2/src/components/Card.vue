<template>
    <div>
        <card :header="header" :footer="link" >
            <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
            <div slot="content" class="card-padding">
                <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
                <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..</p>
            </div>
        </card>
        <divider>--</divider>
        <card>
            <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
            <div slot="content" class="card-padding">
                <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
                <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..</p>
            </div>
        </card>
    </div>
</template>
<script>
  import { Divider, Card } from 'vux'
  export default {
    directives: {
      // TransferDom
    },
    components: {
      Divider,
      Card
    },
    data () {
      return {
        link: {title: '查看详情', link: '/img?id=22'},
        header: {title: '美剧就是'}
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
