<template>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../assets/vux_logo.png">
            <h1></h1>
        </div>
        <group>
            <x-input placeholder="说明"></x-input>
            <x-textarea :max="200" name="description" placeholder="详细描述"></x-textarea>
            <uploader title="上传图片" size="small" ref="input"
                      :max="uploadImgMax"
                      :images="uploadImgs"
                      :handle-click="false"
                      :show-header="true"
                      :showTip="true"
                      :readonly="false"
                      :upload-url="uploadImgUrl"
                      :params="uploadImgParams"
                      :autoUpload="false"
                      @preview="previewMethod"
                      @add-image="addImageMethod"
                      @remove-image="removeImageMethod"
                      @upload-image="uploadImg"
            ></uploader>
        </group>
        <group>

        </group>
    </div>
</template>
<script>
  import { XTextarea, Group, XInput } from 'vux'
  import Uploader from 'vux-uploader'
  import requsetHandle from '../request/main'
  export default {
    data () {
      return {
        uploadImgMax: 5,
        uploadImgs: [],
        uploadImgUrl: 'https://www.shiji.com/api/file/uploadImg',
        uploadImgParams: {}
      }
    },
    components: {
      XTextarea,
      Group,
      XInput,
      Uploader
    },
    mounted () {
      this.initHeader()
    },
    methods: {
      uploadImg (data) {
        let _this = this
        requsetHandle.post('/api/file/uploadImg', data).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.$refs.input.value = ''
            _this.uploadImgs.push(response.data.data)
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      previewMethod () {
        // ss
      },
      addImageMethod () {
        // ss
      },
      removeImageMethod () {
        // ss
      },
      initHeader () {
        let e = {
          headerTitle: '意见反馈',
          isShowBack: true,
          isShowMore: false
        }
        this.$parent.$emit('changeHeader', e)
      }
    }
  }
</script>
<style lang="less">
    .vux-demo {
        text-align: center;
    }

    .a-right {
        float: right;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
