<template>
    <div>
        <div class="amap-page-container">
            <el-amap vid="amapDemo" :mapStyle="mapStyle" :zoom="zoom" :zoomss="zooms" class="amap-demo"
                     :plugin="plugin">

            </el-amap>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      let self = this
      return {
        zoom: 11,
        zooms: [9, 12],
        mapStyle: 'amap://styles/whitesmoke', // 样式URL
        plugin: [{
          pName: 'Geolocation',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }]
      }
    }
  }
</script>
<style>
    .amap-page-container {
        height: 100%;
        width: 100%;
        bottom: 53px;
        position: absolute;
       /*
       overflow: auto;

        */
    }
    .search-box {
         position: absolute;
         top: 25px;
         left: 20px;
     }
</style>