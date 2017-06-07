<template>
  <div class="index-wrapper">
    <div class="container">
      <Row :gutter="gutter">
        <Col span="10">
        <div class="map">
          <zMap :tableStatus="tableStatus"></zMap>
        </div>
        </Col>
        <Col span="14">
          <ZChart :gutter="gutter" :height="height" :tableStatus="tableStatus"></ZChart>
        </Col>
      </Row>
      <Row :gutter="gutter">
        <Col span="24">
          <div class="ztable">
            <ZTable v-on:tableStatus="getTableStatus" :gutter="gutter" :height="tableHeight"></ZTable>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Zmenu from '@/components/Menu.vue'
  import ZMap from '@/components/map/Map.vue'
  import ZChart from '@/components/chart/Chart.vue'
  import ZTable from '@/components/table/Table'
  import window from 'window'
  export default {
    data () {
      return {
        height: 300,
        tableHeight: 220,
        gutter: 20,
        tableStatus: {}
      }
    },
    mounted() {
      let windowHeight = window.document.documentElement.clientHeight
      let gutter = 20 * windowHeight / 661
      let height = 300 * windowHeight / 661
      let tableHeight = 240 * windowHeight / 661
      this.gutter = gutter
      this.height = height
      this.tableHeight = tableHeight
    },
    components: {
      ZMap,
      Zmenu,
      ZTable,
      ZChart
    },
    methods: {
      getTableStatus(params) {
        this.tableStatus = params
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .index-wrapper
    position absolute
    width 100%
    left 0
    top 0
    bottom 0
    background #f5f7f9
    .container
      padding 21px 20px 20px 20px
      .map
        border 1px solid #d7dde4
      #chart
        background #fff
        border 1px solid #d7dde4
        width 100%
      .ztable
        margin-top 16px
</style>
