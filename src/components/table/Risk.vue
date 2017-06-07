<template>
  <div>
    <Row :gutter="gutter" v-show="showRisk">
      <Col span="20">
        <Table :columns='RiskTable.columns' :data='RiskTable.data' size='small' :highlight-row="true" :height="height"></Table>
      </Col>
      <Col span="4">
        <div class="data-zoom">
          <h3>{{riskProps.areaName}}风险等级统计表</h3>
          <p>企业类型 ：{{riskProps.entName}}</p>
        </div>
      <span class="icon icon-arrow-left back" @click.stop="back"><span class="back-font">返回</span></span>
      </Col>
    </Row>
    <Law v-show="showLaw" :lawData="lawData" v-on:Lawback="Lawback" :height="height" :gutter="gutter"></Law>
    <div v-show="showRisk" class="page">
      <Page :total="total" size="small"  show-elevator @on-change="pageChange" @on-page-size-change="limitChange" :show-total=true></Page>
    </div>
    <Modal v-model="showEnt" title="企业详情" width="1200" :styles="{top: '20px'}">
      <div  v-bind:style="{height:entHeight + 'px'}"></div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Law from '@/components/table/Law'
  let data = require('@/assets/api/data.js')
  import window from 'window'
  export default {
    mouted() {
      let windowHeight = window.document.documentElement.clientHeight
      let windowWidth = window.document.documentElement.clientHeight
      this.windowHeight = windowHeight
      this.windowWidth = windowWidth
    },
    props: {
      riskProps: {
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
        windowHeight: 500,
        windowWidth: 1300,
        showEnt: false,
        lawData: [],
        RiskTable: {
          columns: [
            {
              title: '序号',
              key: 'row_num',
              width: 100
            },
            {
              title: '企业名称',
              key: 'ent_name',
              width: 250
            },
            {
              title: '风险等级',
              key: 'ent_risk',
              width: 100
            },
            {
              title: '监管机构',
              key: 'unit_name',
              width: 300
            },
            {
              title: '检查频次',
              key: 'law_num',
              width: 100
            },
            {
              title: '检查结果',
              key: 'law_result',
              width: 100
            },
            {
              title: '检查结果处理',
              key: 'law_deal',
              width: 140,
              render: (h, params) => {
                let that = this
                if (!params.row.law_deal) {
                  return
                }
                return h('a', {
                  on: {
                    click: () => {
                      let url = data.law.index_api.api(params.row.law_id)
                      this.$http.jsonp(url).then((res) => {
                        if (res.body.status) {
                          that.lawData = res.body.data
                          that.showRisk = false
                          that.showLaw = true
                        }
                      })
                    }
                  }
                }, params.row.law_deal)
              }
            }],
          data: []
        },
        pageOption: {
          page: 1,
          limit: 10
        },
        lawId: '',
        showLaw: false,
        showRisk: true,
        entDetail: [],
        total: 0
      }
    },
    computed: {
      showReqMessage() {
        return `当前为 ${this.riskProps.areaName} 的数据`
      },
      entHeight() {
        return this.windowHeight * 0.7
      },
      widthRadio() {
        return this.windowWidth / 1300
      }
    },
    watch: {
      'reqType'() {
        if (this.reqType === 1 || this.reqType === 2) {
          // 请求数据
          this.request(this.riskProps.areaName, this.riskProps.entName, this.pageOption.page, this.pageOption.limit).then((data) => {
            this.RiskTable.data = data.result
            this.total = Number(data.total)
          })
        }
      }
    },
    methods: {
      back () {
        this.$emit('riskBack')
      },
      Lawback() {
        this.showRisk = true
        this.showLaw = false
      },
      warning (message) {
        this.$Notice.warning({
          title: '注意',
          desc: message
        })
      },
      request (areaName, entName, page, limit) {
        // 初始化时请求数据 分页page=1  limit=10
        return new Promise((resolve, reject) => {
          let url = ''
          if (this.reqType === 1) {
            url = data.risk.api({
              areaName,
              entName,
              page,
              limit
            })
            return resolve(url)
          }
          if (this.reqType === 2) {
            url = data.station.api({
              areaName,
              entName,
              page,
              limit
            })
            return resolve(url)
          }
        }).then((url) => {
          return this.$http.jsonp(url)
        }).then((res) => {
          if (res.body.status) {
            return Promise.resolve(res.body.data)
          }
        })
      },
      pageChange(page) {
        this.pageOption.page = page
        let pageStatus = {
          pageOption: this.pageOption,
          clickOnPage: true
        }
        this.$emit('pageStatus', pageStatus)
        this.request(this.riskProps.areaName, this.riskProps.entName, page, this.pageOption.limit).then((data) => {
          this.RiskTable.data = data.result
          this.total = Number(data.total)
        })
      },
      limitChange(limit) {
        this.pageOption.limit = limit
        let pageStatus = {
          pageOption: this.pageOption,
          clickOnPage: true
        }
        this.$emit('pageStatus', pageStatus)
        this.request(this.riskProps.areaName, this.riskProps.entName, this.pageOption.page, limit).then((data) => {
          this.RiskTable.data = data.result
          this.total = Number(data.total)
        })
      }
    },
    components: {
      Law
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .data-zoom
    padding: 10px
    width 100%
  .back
    font-size 20px
    vertical-align top
    .back-font
      font-size 12px
      line-height 20px
      margin-left 5px
      font-weight 700
      vertical-align top
    &:hover
      color rgb(240,20,20)
      cursor pointer
  .page
    margin-top 16px
</style>
