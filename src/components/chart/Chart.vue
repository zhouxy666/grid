<template>
  <div>
    <div id="chart" v-bind:style="{height:height + 'px'}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  let data = require('@/assets/api/data')
  export default {
    props: {
      tableStatus: {
        type: Object
      },
      height: {
        type: Number
      }
    },
    data() {
      return {
        title: '运城市',
        legend: ['餐饮企业', '食品生产', '小作坊', '食品流通',
          '药品经营', '药品生产', '器械生产', '器械经营', '医疗机构'],
        xAxis: ['A级', 'B级', 'C级', 'D级'],
        series: [
          {
            name: '餐饮企业',
            type: 'bar',
            data: [10, 27, 30, 40]
          },
          {
            name: '食品生产',
            type: 'bar',
            data: [20, 20, 40, 50]
          },
          {
            name: '小作坊',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '食品流通',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '药品经营',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '药品生产',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '器械生产',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '器械经营',
            type: 'bar',
            data: [10, 20, 30, 40]
          },
          {
            name: '医疗机构',
            type: 'bar',
            data: [10, 20, 30, 40]
          }
        ],
        mychart: {}
      }
    },
    watch: {
      tableStatus: {
        deep: true,
        handler() {
          let tableStatus = this.tableStatus
          if (!tableStatus.reqType) {
            let url = data.chart.index_api.api
            this.request(url)
          }
          if (tableStatus.reqType === 1 && tableStatus.clickOnArea) {
            let url = data.chart.town_api.api(tableStatus.areaName)
            this.request(url)
          }
          if (tableStatus.reqType === 1 && tableStatus.clickOnEnt) {
            let url = data.chart.ent_api.api({
              areaName: tableStatus.areaName,
              entName: tableStatus.entName
            })
            this.request(url)
          }
          if (tableStatus.reqType === 2 && tableStatus.clickOnStationEnt) {
            let url = data.chart.ent_api.api({
              areaName: tableStatus.areaName,
              entName: tableStatus.entName
            })
            this.request(url)
          }
        }
      }
    },
    mounted() {
      if (!this.tableStatus.reqType) {
        let url = data.chart.index_api.api
        this.request(url)
      }
      this.$nextTick(() => {
        let myChart = echarts.init(document.getElementById('chart'))
        this.mychart = myChart
      })
    },
    computed: {
      getOptions() {
        let options = {
          title: {
            text: this.title + '风险等级',
            color: '#fff',
            top: 5,
            left: '4%'
          },
          grid: {
            bottom: '10%',
            right: '6%'
          },
          tooltip: {},
          xAxis: {
            data: this.xAxis
          },
          yAxis: {
            name: '数量',
            nameLocation: 'start',
            nameGap: 6,
            nameTextStyle: {
              color: '#464c5b',
              fontWeight: 700,
              fontSize: 12
            }
          },
          legend: {
            top: 30,
            data: this.legend
          },
          series: this.series
        }
        return options
      },
      getHeight() {
        return this.height
      }
    },
    methods: {
      request(url) {
        this.$http.jsonp(url).then((res) => {
          this.title = res.body.data.title
          this.legend = res.body.data.legend
          this.series = res.body.data.series
          this.mychart.setOption(this.getOptions)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
