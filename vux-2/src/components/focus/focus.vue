<template>
    <div >
        <x-icon v-show="!focus" type="ios-heart-outline" size="27" ></x-icon>
        <x-icon v-show="focus" type="ios-heart" size="27"></x-icon>
        <group v-show="false">
            <popup-picker :title="title" :data="categoryList" v-model="pickerValue" @on-change="clickList"
                          :placeholder="placeholder" :columns="1" :show="show"></popup-picker>
        </group>
        <div v-transfer-dom>
            <popup v-model="showAdd" height="240px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:220px;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <cell>
                            <x-input title="" v-model="categoryValue" placeholder="输入收藏分类" :max="20"></x-input>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="addCategoryFunction" :disabled="commitDis"
                                  :show-loading="commitShowLoading">提交
                        </x-button>
                        <x-button @click.native="showAdd = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
  import { TransferDom, Group, XButton, PopupPicker, XInput, Popup, Cell } from 'vux'
  import requsetHandle from '../../request/main'
  export default {
    name: 'jeemufocus',
    directives: {
      TransferDom
    },
    components: {
      Group,
      XButton,
      PopupPicker,
      XInput,
      Popup,
      Cell
    },
    props: {
      targetId: {
        type: Number,
        default: 0
      },
      Type: {
        type: String,
        default: 'oil'
      }
    },
    data () {
      return {
        // showTables: true,
        focus: false,
        categoryList: [],
        show: false,
        pickerValue: [],
        title: '',
        placeholder: '',
        showAdd: false,
        categoryValue: '',
        commitDis: false,
        commitShowLoading: false
      }
    },
    mounted: function () {
      this.isFocusFunction()
      this.initCategoryList()
    },
    methods: {
      divClick () {
        console.log(122)
      },
      clickList (e) {
        this.show = false
        if (this.targetId === 0) {
          return
        }
        let _this = this
        requsetHandle.get('/api/focus/focus', {
          target_id: this.targetId,
          type: this.Type,
          focus_id: e[0]
        }).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.focus = data.data[0]
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      isFocusFunction () {
        if (this.targetId === 0) {
          return
        }
        let _this = this
        requsetHandle.get('/api/focus/isFocus', {target_id: this.targetId, type: this.Type}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.focus = data.data[0]
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      focusFunction () {
        if (this.targetId === 0) {
          return
        }
        let _this = this
        requsetHandle.get('/api/focus/focus', {target_id: this.targetId, type: this.Type}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.focus = data.data[0]
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      cancelFunction () {
        if (this.targetId === 0) {
          return
        }
        let _this = this
        requsetHandle.get('/api/focus/cancel', {target_id: this.targetId, type: this.Type}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.focus = false
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      addCategoryFunction () {
        if (this.categoryValue === '') {
          this.$vux.toast.text('请正确填写分类名称', 'bottom')
          return
        }
        let _this = this
        _this.startCommit()
        requsetHandle.post('/api/focus/addCategory', {name: _this.categoryValue}).then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            _this.showAdd = false
          }
          _this.initCategoryList(true)
          _this.endCommit()
        }).catch(function (error) {
          _this.endCommit()
          requsetHandle.handleError(error, _this)
        })
      },
      initCategoryList (showList = false) {
        let _this = this
        requsetHandle.get('/api/focus/getCategoryList').then(function (response) {
          let data = requsetHandle.handleRespons(response, _this)
          if (data.status === 1) {
            let temp = []
            data.data.forEach(function (value) {
              temp.push({name: value.name, value: value.id})
            })
            if (showList) {
              _this.show = true
            }
            _this.categoryList = temp
          }
        }).catch(function (error) {
          requsetHandle.handleError(error, _this)
        })
      },
      startCommit () {
        this.commitDis = true
        this.commitShowLoading = true
      },
      endCommit () {
        this.commitDis = false
        this.commitShowLoading = false
      },
      updateFocus () {
        // this.focus = !this.focus
        if (!this.focus) {
          if (this.categoryList.length !== 0) {
            this.show = true
          } else {
            this.showAdd = true
          }
        } else {
          this.cancelFunction()
        }
      }
    },
    watch: {
      focus (val, oldval) {
        console.log(val, oldval)
        // console.log(val, oldval)
        // this.$emit('focusResult', val)
      }
        /*
         ,
         categoryList (val, oldVal) {
         if (val.length === 0) {
         this.showAdd = true
         } else {
         this.show = true
         }
         }
         */
    }
  }
</script>
