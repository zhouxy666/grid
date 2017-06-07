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
      <County v-on:countyBack = "countyBack" :countyProps="countyProps" v-on:stationRisk="showStationRisk" :height="height" :gutter="gutter" :reqType="tableStatus.reqType"></County>
    </div>
    <div class="RiskTable" v-show="showRisk">
      <Risk v-on:riskBack = "riskBack" v-on:pageStatus="pageStatus" :riskProps="riskProps" :height="height" :gutter="gutter" :reqType="reqType"></Risk>
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
        tableStatus: {
          areaName: '',
          areaCode: '',
          entName: '',
          entType: '',
          pageOption: {
            page: 1,
            limit: 10
          },
          clickOnArea: false,
          clickOnEnt: false,
          clickOnStationEnt: false,
          clickOnPage: false,
          reqType: 0,
          pageType: 0
        },
        reqType: 0,
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
        countyByEnt: []
      }
    },
    watch: {
      tableStatus: {
        deep: true,
        handler() {
          this.$emit('tableStatus', this.tableStatus)
        }
      }
    },
    methods: {
      countyBack () {
        this.reqType = 0
        this.tableStatus = {
          areaName: '运城市',
          areaCode: config.AREACODE.YCS,
          pageOption: {
            page: 1,
            limit: 10
          },
          reqType: 0,
          clickOnEnt: false,
          clickOnStationEnt: false,
          clickOnArea: false
        }
        this.showRisk = false
        this.showCounty = false
        this.showIndex = true
      },
      riskBack () {
        this.reqType = 0
        this.tableStatus = {
          areaName: '运城市',
          areaCode: config.AREACODE.YCS,
          pageOption: {
            page: 1,
            limit: 10
          },
          reqType: 0,
          clickOnEnt: false,
          clickOnStationEnt: false,
          clickOnArea: false
        }
        this.showRisk = false
        this.showCounty = false
        this.showIndex = true
      },
      pageStatus(params) {
        this.tableStatus.pageOption = params.pageOption
        this.tableStatus.clickOnPage = params.clickOnPage
      },
      showStationRisk(params) {
        let areaCode = params.areaCode || ''
        let areaName = params.areaName || ''
        let entType = params.entType || ''
        let entName = params.entName || ''
        let reqType = params.reqType
        // 更新上传状态
        this.tableStatus.reqType = reqType
        this.tableStatus.areaCode = areaCode
        this.tableStatus.areaName = areaName
        this.tableStatus.entType = entType
        this.tableStatus.entName = entName
        this.tableStatus.pageOption = {
          page: 1,
          limit: 10
        }
        // 控制组件显示状态
        this.tableStatus.clickOnEnt = true
        this.tableStatus.clickOnStationEnt = true
        this.tableStatus.clickOnArea = false
        // 更新risk组件的状态
        this.riskProps.areaCode = areaCode
        this.riskProps.areaName = areaName
        this.riskProps.entType = entType
        this.riskProps.entName = entName
        this.reqType = 2
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
        this.tableStatus.reqType = reqType
        this.tableStatus.areaCode = areaCode
        this.tableStatus.areaName = areaName
        this.tableStatus.entType = entType
        this.tableStatus.entName = entName
        this.tableStatus.pageOption = {
          page: 1,
          limit: 10
        }
        this.tableStatus.clickOnEnt = true
        this.tableStatus.clickOnStationEnt = false
        this.tableStatus.clickOnArea = false
        // 更新risk组件状态
        this.riskProps.areaCode = areaCode
        this.riskProps.entType = entType
        this.riskProps.areaName = areaName
        this.riskProps.entName = entName
        this.reqType = reqType
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
        this.tableStatus.areaCode = areaCode
        this.tableStatus.areaName = areaName
        this.tableStatus.entType = entType
        this.tableStatus.entName = entName
        this.tableStatus.pageOption = {
          page: 1,
          limit: 10
        }
        this.tableStatus.clickOnEnt = false
        this.tableStatus.clickOnStationEnt = false
        this.tableStatus.clickOnArea = true
        this.tableStatus.reqType = reqType
        // 更新county组件状态
        this.countyProps.areaCode = areaCode
        this.countyProps.areaName = areaName
        this.reqType = reqType
        // 控制组件的显示隐藏
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
