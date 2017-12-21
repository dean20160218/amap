<template>
    <sticky style="position: absolute;top: 0px;height: 100%">
    <div>
        <search
                :results="searchResults"
                v-model="searchValue"
                position="absolute"
                @on-submit="searchSubmit"
                @on-change="searchChange"
                @result-click="resultClick"
                @on-cancel="searchCancel"
                ref="search"></search>
        <div id="map-container" tabindex="0"></div>
    </div>
        </sticky>
</template>

<script>
  import { Search, Sticky } from 'vux'
  import AMap from 'AMap'
  import Request from '../request/main'
  export default {
    components: {
      Search,
      Sticky
    },
    data () {
      return {
        map: {},
        searchValue: '',
        searchResults: []
      }
    },
    created: function () {
      this.initParent()
    },
    mounted: function () {
      this.initMap()
    },
    methods: {
      initMap () {
        let than = this
        than.map = new AMap.Map('map-container', {
          resizeEnable: true,
          zoom: 11,
          zooms: [9, 12],
          // center: [116.480983, 40.0958],
          mapStyle: 'amap://styles/whitesmoke'// 样式URL
        })
        than.map.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 20,          // 超过10秒后停止定位，默认：无穷大
            maximumAge: 1000 * 60,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          than.map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', than.onComplete) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', than.onError)      // 返回定位出错信息
        })
        AMap.event.addListener(this.map, 'moveend', than.update)
        AMap.event.addListener(this.map, 'zoomend', than.update)
      },
      onComplete (succ) {
        console.log(succ)
      },
      onError (err) {
        console.log(err)
      },
      update () {
        console.log(6)
        let than = this
        let bound = than.map.getBounds()
        console.log(bound)
        Request.get('/api/addr/addr', {
          min_lng: bound.southwest.lng,
          min_lat: bound.southwest.lat,
          max_lng: bound.northeast.lng,
          max_lat: bound.northeast.lat
        }).then(function (response) {
          let data = Request.handleRespons(response, than)
          // console.log(data)
          data.data.forEach(function (item) {
            console.log(item)
            let marker = new AMap.Marker({
              map: than.map,
              // icon: './gaode/images/mark_0.png',
              position: [item.gaode_lng, item.gaode_lat],
              title: item.id + '-',
              extData: item.id
              // clickable:true
            })
            AMap.event.addListener(marker, 'click', function (e, s) {
              console.log(e.target)
              console.log(s)
              than.$router.push({path: '/act', query: {id: 1}})
            })
          })
        }).catch(function (error) {
          console.log(error)
        })
      },
      searchSubmit () {
        this.searchValue = ''
        console.log(1)
      },
      searchChange (e) {
        this.searchResults = []
        this.searchResults.push({title: e + '人物'})
        this.searchResults.push({title: e + '位置'})
      },
      resultClick (e) {
        this.searchValue = ''
        console.log(e)
      },
      searchCancel () {
        this.searchValue = ''
      },
      initParent () {
        // this.$parent.bodyPaddingTop = '0px'
      }
    }
  }
</script>
<style>
    #map-container {
        height: 100%;
        width: 100%;
        bottom: 50px;
        position: absolute;
        /*
        overflow: auto;

         */
    }
</style>
