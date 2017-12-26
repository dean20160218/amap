<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell> <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell> <cell title="VUX" value="cool" is-link></cell> <cell title="VUX" value="cool" is-link></cell>
      <cell title="VUX" value="cool" is-link></cell>




    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import Request from '../request/main'
export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      Request.get('/api/user/loginUrl').then(function (response) {
        let data = Request.handleRespons(response, _this)
        console.log(data)
      }).catch(function (error) {
        Request.handleError(error, _this)
      })
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
