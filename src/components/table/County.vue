<template>
  <div>
    <Row :gutter="gutter">
      <Col span="20">
        <Table :columns='countyTable.columns' :data='countyTable.data' size='small' :highlight-row="true" :height="height"></Table>
      </Col>
      <Col span="4">
        <div class="data-zoom">
          <span class="icon icon-arrow-left back" @click.stop="back"></span>
          <h2>{{this.countyProps.areaName}}网格化数据统计</h2>
          <p class="data-box" v-for="(item,index) in countyByEnt" v-if="index > 0?true:false">
            <span class="box-font"><strong>{{item.entType}}</strong></span><span class="box-num">{{item.count}}</span>
          </p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
//  const config = require('@/assets/js/config')
  let data = require('@/assets/api/data.js')
  export default {
    props: {
      countyProps: {
        type: Object
      },
      gutter: {
        type: Number
      },
      height: {
        type: Number
      },
      reqType: {
        type: Number
      }
    },
    data () {
      return {
        countyTable: {
          columns: [
            {
              title: '区域',
              key: 'area',
              width: 150,
              fixed: 'left'
            },
            {
              title: '餐饮企业',
              key: 'cyqy',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.cyqy)
              }
            },
            {
              title: '食品生产',
              key: 'spsc',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.spsc)
              }
            },
            {
              title: '食品流通',
              key: 'splt',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.splt)
              }
            },
            {
              title: '药品经营',
              key: 'ypjy',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.ypjy)
              }
            },
            {
              title: '药品生产',
              key: 'ypsc',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.ypsc)
              }
            },
            {
              title: '器械生产',
              key: 'qxsc',
              width: 150,
              render: (h, params) => {
                return h('a', {
                  on: {
                    click: () => {
                      this.stationClick(params)
                    }
                  }
                }, params.row.qxsc)
              }
            },
            {
              title: '小计',
              key: 'count',
              width: 150
            }],
          data: []
        },
        countyByEnt: []
      }
    },
    methods: {
      back () {
        this.$emit('countyBack')
      },
      stationClick (params) {
        // 如果当前为站所 此时的 countyProps.areaCode
        let stationRiskParams = {
          areaCode: this.countyProps.areaCode,
          areaName: params.row.area,
          entType: params.column.key,
          entName: params.column.title,
          reqType: this.reqType + 1
        }
        this.$emit('stationRisk', stationRiskParams)
      }
    },
    watch: {
      countyProps: {
        deep: true,
        handler () {
          let areaName = this.countyProps.areaName
          // 根据区域名称请求数据
          this.$http.jsonp(data.town.api(areaName)).then((res) => {
            if (res.body.status) {
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
                if (countyByEnt[i].entType === 'count') countyByEnt[i].entType = '总数'
              }
              this.countyByEnt = countyByEnt
              this.countyTable.data = []
              this.countyTable.data = res.body.data.result
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .data-zoom
    padding: 15px
    width 100%
    .box-font
      margin-right 20px
      display inline-block
      width 50px
      color #495060
    .box-num
      font-weight 200
      color #2d8cf0
  .back
    font-size 20px
    &:hover
      color color rgb(240,20,20)
      cursor pointer
</style>
