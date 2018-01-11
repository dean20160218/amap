<template>
<div>
    <group v-show="false">
        <popup-picker :title="title" :data="focusList" v-model="pickerValue" @on-change="clickList" :placeholder="placeholder" :columns="1" :show="show"></popup-picker>
    </group>
</div>
</template>
<script>
  import { TransferDom, Group, XButton, PopupPicker } from 'vux'
  import requsetHandle from '../../request/main'
  export default {
    name: 'jeemufocus',
    directives: {
      TransferDom
    },
    components: {
      Group,
      XButton,
      PopupPicker
    },
    props: {
      targetId: {
        type: Number,
        default: 0
      },
      Type: {
        type: String,
        default: 'oil'
      },
      isFocus: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // showTables: true,
        focusList: [{
          name: '中国',
          value: 'china'
        }, {
          name: '美国',
          value: 'USA'
        }],
        show: false,
        pickerValue: [],
        title: '',
        placeholder: ''
      }
    },
    mounted: function () {
      this.isFocusFunction()
    },
    methods: {
      clickList (e) {
        this.$emit('focusResult', e)
        console.log(e)
      },
      isFocusFunction () {
        if (this.targetId === 0) {
          return
        }
        let _this = this
        requsetHandle.get('/api/focus/isFocus', {target_id: this.targetId, type: this.Type}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            // _this.isFocus = data.data[0]
            _this.$emit('focusResult', data.data[0])
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      }
    }
  }
</script>
