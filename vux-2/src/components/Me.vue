<template>

</template>
<script>
  export default {
    created: function () {

    },
    mounted () {
      this.initHeader()
    },
    methods: {
      initHeader () {
        let e = {
          headerTitle: '我',
          actionsheetMenus: {
            business: '商务合作',
            share: '分享朋友圈',
            feedback: '意见反馈'
          }
        }
        this.$parent.$emit('changeHeader', e)
      }
    }
  }
</script>
