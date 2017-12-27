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
      console.log(this.$parent.headerTitle)
      this.$parent.headerTitle = '我'
      this.$parent.actionsheetMenus = {
        business: '商务合作',
        share: '分享朋友圈',
        test: '测试'
      }
      this.$parent.clickActionsheet = function (e) {
        // alert(e)
      }
    }
  }
}
</script>
