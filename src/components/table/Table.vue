<template>
  <div class="table-wrapper">
    <div class="indexTable" v-show="showIndex">
      <Row :gutter="gutter">
        <Col span="20">
          <Table :columns='indexTable.columns' :data='indexTable.data' size='small' :highlight-row="true" :height='height'>
          </Table>
        </Col>
        <Col span="4">
          <div class="data-zoom">
            <h3>运城地区网格化数据统计</h3>
            <p class="data-box" v-for="(item,index) in countyByEnt" v-if="index > 0?true:false">
              <span class="box-font"><strong>{{item.entType}}</strong></span><span class="box-num">{{item.count}}</span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
    <div class="countyTable" v-show="showCounty">
      <County v-on:countyBack = "countyBack" :countyProps="countyProps" v-on:stationRisk="showStationRisk" :height="height" :gutter="gutter" :reqType="reqType"></County>
    </div>
    <div class="RiskTable" v-show="showRisk">
      <Risk v-on:riskBack = "riskBack" :riskProps="riskProps" :height="height" :gutter="gutter" :reqType="reqType"></Risk>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const utils = require('@/assets/js/utils')
  import County from '@/components/table/County'
  import Risk from '@/components/table/Risk'
  let data = require('@/assets/api/data')
  let config = require('@/assets/api/config')
  export default {
    props: {
      height: {
        type: Number,
        default: 300
      },
      gutter: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        countyProps: {
          areaName: '',
          areaCode: ''
        },
        riskProps: {
          areaCode: '',
          areaName: '',
          entType: ''
        },
        chartProps: {
          areaCode: '',
          areaName: '',
          entName: '',
          entType: ''
        },
        areaName: '',
        areaCode: '',
        entName: '',
        entType: '',
        clickOnArea: false,
        clickOnEnt: false,
        clickOnStationEnt: false,
        showRisk: false,
        showCounty: false,
        showStation: false,
        showIndex: true,
        indexTable: {
          columns: [
            {
              title: '区域',
              key: 'area',
              width: 150,
              fixed: 'left',
              render: (h, params) => {
                if (params.index > 12) {
                  return h('span', {
                  }, params.row.area)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showCountyTable(params)
                      }
                    }
                  }, params.row.area)
                }
              }
            },
            {
              title: '餐饮企业',
              key: 'cyqy',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.cyqy)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.cyqy)
                }
              }
            },
            {
              title: '食品生产',
              key: 'spsc',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.spsc)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.spsc)
                }
              }
            },
            {
              title: '小作坊',
              key: 'xzf',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.xzf)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.xzf)
                }
              }
            },
            {
              title: '食品流通',
              key: 'splt',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.splt)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.splt)
                }
              }
            },
            {
              title: '药品经营',
              key: 'ypjy',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.ypjy)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.ypjy)
                }
              }
            },
            {
              title: '药品生产',
              key: 'ypsc',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.ypsc)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.ypsc)
                }
              }
            },
            {
              title: '器械生产',
              key: 'qxsc',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.qxsc)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.qxsc)
                }
              }
            },
            {
              title: '器械经营',
              key: 'qxjy',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.qxjy)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.qxjy)
                }
              }
            },
            {
              title: '医疗机构',
              key: 'yljg',
              width: 150,
              render: (h, params) => {
                if (params.index === 17) {
                  return h('span', {}, params.row.yljg)
                } else {
                  return h('a', {
                    on: {
                      click: () => {
                        this.showRiskTable(params)
                      }
                    }
                  }, params.row.yljg)
                }
              }
            },
            {
              title: '小计',
              key: 'countByArea',
              width: 150
            }
          ],
          data: []
        },
        total: 0,
        reqType: 0,
        countyByEnt: []
      }
    },
    watch: {
      'reqType'() {
        let params = {
          reqType: this.reqType,
          areaName: this.areaName,
          areaCode: this.areaCode,
          entName: this.entName,
          entType: this.entType,
          clickOnArea: this.clickOnArea,
          clickOnEnt: this.clickOnEnt,
          clickOnStationEnt: this.clickOnStationEnt
        }
        this.$emit('reqType', params)
      }
    },
    methods: {
      countyBack () {
        this.areaName = '运城市'
        this.areaCode = config.AREACODE.YCS
        this.showRisk = false
        this.showCounty = false
        this.showIndex = true
        this.reqType = 0
        this.clickOnEnt = false
        this.clickOnStationEnt = false
        this.clickOnArea = false
      },
      riskBack () {
        this.areaName = '运城市'
        this.areaCode = config.AREACODE.YCS
        this.showRisk = false
        this.showCounty = false
        this.showIndex = true
        this.reqType = 0
        this.clickOnEnt = false
        this.clickOnStationEnt = false
        this.clickOnArea = false
      },
      showStationRisk(params) {
        let areaCode = params.areaCode || ''
        let areaName = params.areaName || ''
        let entType = params.entType || ''
        let entName = params.entName || ''
        let reqType = params.reqType
        this.reqType = reqType
        this.areaCode = areaCode
        this.areaName = areaName
        this.entType = entType
        this.entName = entName
        this.clickOnEnt = true
        this.clickOnStationEnt = true
        this.clickOnArea = false
        this.riskProps.areaCode = areaCode
        this.riskProps.areaName = areaName
        this.riskProps.entType = entType
        this.riskProps.entName = entName
        // 切换组件状态
        this.showRisk = true
        this.showCounty = false
        this.showIndex = false
      },
      showRiskTable (params) {
        let areaCode = utils.formatAreaCode(params.index) || ''
        let entType = params.column.key || ''
        let areaName = params.row.area || ''
        let entName = params.column.title || ''
        let reqType = this.reqType + 1
        this.reqType = reqType
        this.areaCode = areaCode
        this.areaName = areaName
        this.entType = entType
        this.entName = entName
        this.clickOnEnt = true
        this.clickOnStationEnt = false
        this.clickOnArea = false
        this.riskProps.areaCode = areaCode
        this.riskProps.entType = entType
        this.riskProps.areaName = areaName
        this.riskProps.entName = entName
        this.showRisk = true
        this.showIndex = false
        this.showCounty = false
      },
      showCountyTable (params) {
        let areaCode = utils.formatAreaCode(params.index)
        let areaName = params.row.area
        let entType = params.entType || ''
        let entName = params.entName || ''
        let reqType = this.reqType + 1
        this.reqType = reqType
        this.areaCode = areaCode
        this.areaName = areaName
        this.entType = entType
        this.entName = entName
        this.clickOnEnt = false
        this.clickOnStationEnt = false
        this.clickOnArea = true
        this.countyProps.areaCode = areaCode
        this.countyProps.areaName = areaName
        this.showIndex = false
        this.showRisk = false
        this.showCounty = true
      }
    },
    mounted() {
      // 请求正式数据
      this.$http.jsonp(data.main.api('运城市')).then((res) => {
        if (res.body.status) {
          let datas = res.body.data.result
          let countyByEnt = res.body.data.countyByEnt
          for (let i = 0; i < countyByEnt.length; i++) {
            if (countyByEnt[i].entType === 'cyqy') countyByEnt[i].entType = '餐饮企业'
            if (countyByEnt[i].entType === 'ypjy') countyByEnt[i].entType = '药品经营'
            if (countyByEnt[i].entType === 'ypsc') countyByEnt[i].entType = '药品生产'
            if (countyByEnt[i].entType === 'qxjy') countyByEnt[i].entType = '器械经营'
            if (countyByEnt[i].entType === 'qxsc') countyByEnt[i].entType = '器械生产'
            if (countyByEnt[i].entType === 'splt') countyByEnt[i].entType = '食品流通'
            if (countyByEnt[i].entType === 'spsc') countyByEnt[i].entType = '食品生产'
            if (countyByEnt[i].entType === 'yljg') countyByEnt[i].entType = '医疗机构'
            if (countyByEnt[i].entType === 'xzf') countyByEnt[i].entType = '小作坊'
            if (countyByEnt[i].entType === 'countByArea') countyByEnt[i].entType = '总数'
          }
          this.indexTable.data = []
          this.indexTable.data = datas
          this.countyByEnt = countyByEnt
        }
      })
    },
    components: {
      County,
      Risk
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .table-wrapper
    .data-zoom
      padding: 10px
      width 100%
      .box-font
        margin-right 20px
        display inline-block
        width 50px
        color #495060
      .box-num
        font-weight 200
        color #2d8cf0
      p
        line-height 20px
      h3
        margin-bottom 5px
</style>
