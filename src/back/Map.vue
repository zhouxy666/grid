<template>
  <div class="map-wrapper">
    <el-amap
      :vid="'amap-vue'"
      :map-manager="amapManager"
      :center="center"
      :zoom ="zoom"
      :events="events"
    >
      <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
      <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible" :content="window.content" :events="events"></el-amap-info-window>
    </el-amap>
    <Row>
      <Col span="24">
        <span>{{mapStatus.areaCode}}</span>
        <Button class="btnTest" @click="btnTest">测试</Button>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {AMapManager} from 'vue-amap'
  const config = require('@/assets/js/config')
  let amapManager = new AMapManager()
  export default {
    props: {
      mapStatus: {
        areaCode: String,
        default: config.AREACODE.YCS
      }
    },
    data () {
      return {
        zoom: 10,
        center: [110.98114014, 35.03224538],
        amapManager: amapManager,
        map: {},
        events: {
          init (map) {
            console.log(map)
          }
        },
        markers: [
          {
            position: [111.0095715523, 35.0268863048],
            events: {
              click (map) {
                alert(map.getCity())
              }
            }
          }
        ],
        windows: [
          {
            position: [111.0095715523, 35.0268863048],
            visible: true,
            content: `<h5>重庆小面</h5>`,
            events: {
              close () {
                console.log('close')
              }
            }
          }
        ]
      }
    },
    methods: {
      add () {
        let marker = {
          position: [111.0095715523 + (Math.random() - 0.5) * 0.02, 35.0268863048 + (Math.random() - 0.5) * 0.02]
        }
        this.markers.push(marker)
      },
      remove () {
        if (!this.markers.length) return
        this.markers.splice(this.markers.length - 1, 1)
      },
      btnTest () {
        console.log(this.amapManager.getMap())
        let mapCenter = this.amapManager.getMap().getCenter()
        console.log(mapCenter.getLng(), mapCenter.getLat())
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .map-wrapper
    height 100%
    width 100%
</style>
