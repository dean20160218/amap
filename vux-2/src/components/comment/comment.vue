<template>
<div>
    <group-title>ssssssswww</group-title>
    <tab :line-width="2" >
        <tab-item selected @on-item-click="changeTabFuntion">按热度</tab-item>
        <tab-item @on-item-click="changeTabFuntion">按时间</tab-item>
    </tab>
</div>
</template>
<script>
  import { TransferDom, Group, GroupTitle, Tab, TabItem } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      GroupTitle,
      Tab,
      TabItem
    },
    data () {
      return {}
    },
    methods: {
      changeTabFuntion (e) {
        console.log(e)
      }
    }
  }
</script>
<style>

</style>
