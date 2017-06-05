<template>
  <div class="char-wrapper">
    <div id="my-chart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default {
    data() {
      return {
        chartOptions: {
          title: {
            text: '运城市食品生产企业年产值及风险分级汇总表',
            color: '#fff',
            right: 470
          },
          grid: {
            bottom: '10%',
            left: '6%'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['盐湖分局', '河津市', '永济市', '临猗县', '芮城县', '平陆县', '稷山县', '万荣县', '夏县', '绛县', '新绛县', '垣曲县', '闻喜县', '运城市经济开发区', '风陵渡开发区', '空港区开发区', '绛县经济开发区']
          },
          yAxis: [
            {
              name: '数量(家)',
              type: 'value',
              position: 'left'
            },
            {
              name: '产值(亿)',
              type: 'value',
              position: 'right'
            }
          ],
          legend: {
            top: 30,
            data: ['年产值', 'A级', 'B级', 'C级', 'D级']
          },
          series: [
            {
              type: 'bar',
              name: '年产值',
              data: [9.10, 1.10, 3.90, 1.60, 3.90, 0.25, 2.10, 1.50, 4.30, 0.42, 0.45, 1.40, 1.10, 0.02, 0.63, 3.10, 0.04],
              yAxisIndex: 1
            },
            {
              type: 'bar',
              name: 'A级',
              stack: 'risk',
              data: [19, 0, 1, 0, 3, 3, 7, 3, 1, 4, 5, 2, 7, 0, 2, 3, 0]
            },
            {
              type: 'bar',
              name: 'B级',
              stack: 'risk',
              data: [53, 9, 9, 38, 11, 8, 27, 10, 14, 16, 6, 6, 28, 0, 9, 17, 0]
            },
            {
              type: 'bar',
              name: 'C级',
              stack: 'risk',
              data: [26, 8, 9, 10, 19, 3, 34, 4, 12, 2, 7, 5, 10, 7, 0, 6, 1]
            },
            {
              type: 'bar',
              name: 'D级',
              stack: 'risk',
              data: [5, 7, 12, 2, 1, 2, 5, 0, 2, 3, 3, 3, 2, 1, 0, 3, 0]
            }
          ]
        }
      }
    },
    mounted() {
      let myChart = echarts.init(document.getElementById('my-chart'))
      myChart.setOption(this.chartOptions)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .char-wrapper
    padding 25px
    #my-chart
      width 100%
      height 640px
      background #fff
</style>
