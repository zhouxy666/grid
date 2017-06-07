<template>
  <div>
    <div class="map-wrapper">
      <div id="map-container" :style="{height: mapHeight + 'px'}"></div>
      <Button type="primary" class="map-btn" @click="mapBtn" v-show="showEntList">{{btnMessage}}</Button>
      <div class="spin" v-show="showSpin">
        <Spin size="large"></Spin>
        <span>加载中...</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AMap from 'AMap'
  let config = require('@/assets/api/config')
  let data = require('@/assets/api/data')
  import window from 'window'
  export default {
    props: {
      tableStatus: {
        type: Object
      }
    },
    data () {
      return {
        map: {},
        mapOptions: {
          center: [110.98114014, 35.03224538],
          zoom: 12,
          resizeEnable: true
        },
        markers: [],
        markOptions: (position) => {
          return {
            map: this.map,
            position: position,
            topWhenClick: true,
            visible: true,
            clickable: true
          }
        },
        district: {},
        districtOptions: {
          subdistrict: 1,
          extensions: 'all',
          level: 'city'
        },
        polygon: {},
        polygonOptions: (path) => {
          return {
            path: path,
            strokeWeight: 1,
            fillOpacity: 0.7,
            fillColor: '#CCF3FF',
            strokeColor: '#CC66CC'
          }
        },
        infoWindow: {},
        infoWindowOptions: {
          isCustom: false,
          autoMove: true,
          closeWhenClickMap: true,
          offset: new AMap.Pixel(0, -30)
        },
        infoContent: {},
        showEntList: false,
        showSpin: false,
        windowHeight: 300,
        isShowMarkers: true
      }
    },
    computed: {
      mapHeight() {
        return 300 * this.windowHeight / 661
      },
      btnMessage() {
        return this.isShowMarkers ? '隐藏点位' : '显示点位'
      }
    },
    watch: {
      tableStatus: {
        deep: true,
        handler() {
          let tableStatus = this.tableStatus
          if (!tableStatus.reqType) {
            /*
            * 当前状态为 首页统计页面
            * 1. 显示 运城市 行政区划边界
            * 2. 显示 不同企业类型的数量；鼠标在地图上移动时候显示
            * */
            // 删除地图标记点
            this.map.clearMap()
            let areaCode = tableStatus.areaCode
            // 隐藏企业列表显示按钮
            this.showEntList = false
            // 显示运城市行政区划边界
            this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
              // 调用polygon绘制边界
              this.map.clearMap()
              this.addpolygon(bounds)
              this.polygon.setMap(this.map)
              // 调整视图窗口
              this.map.setFitView()
            }).then(() => {
              /*
               * 鼠标移上去显示各区县的企业数量
               * */
              // 请求数据
              let areaName = this.tableStatus.areaName
              let url = data.main.api(areaName)
              this.$http.jsonp(url).then((res) => {
                if (res.status) {
                  let infoContent = []
                  for (let i = 0; i < res.body.data.result.length; i++) {
                    let temp = {}
                    temp.areaName = res.body.data.result[i].area
                    temp.entCount = res.body.data.result[i].countByArea
                    infoContent.push(temp)
                  }
                  this.infoContent = infoContent
                  return infoContent
                }
              }).then((infoContent) => {
                let html = []
                html.push('<div>')
                infoContent.forEach((content) => {
                  html.push(`<p>${content.areaName} : ${content.entCount}</p>`)
                })
                html.push('</div>')
                let contentHtml = html.join('')
                this.polygon.on('mouseup', () => {
                  this.infoWindow.setContent(contentHtml)
                  // 获取当前点击的经纬度
                  let clickPosition = this.mapOptions.center
                  this.infoWindow.open(this.map, clickPosition)
                })
              })
            })
          }
          if (tableStatus.reqType === 1 && tableStatus.clickOnArea) {
            /*
             * 当前状态为 站所统计页面
             * 1. 显示 某个区县 行政区划边界
             * 2. 显示 站所 不同企业类型的数量
             * 3. 鼠标在地图上移动时候显示
             * */
            this.showEntList = false
            let areaCode = tableStatus.areaCode
            this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
              // 调用polygon绘制边界
              this.map.clearMap()
              this.addpolygon(bounds)
              this.polygon.setMap(this.map)
              // 调整视图窗口
              this.map.setFitView()
            }).then(() => {
              /*
               * 鼠标移上去显示各区县的企业数量
               * */
              // 请求数据
              let areaName = this.tableStatus.areaName
              let url = data.town.api(areaName)
              this.showSpin = true
              this.$http.jsonp(url).then((res) => {
                if (res.status) {
                  this.showSpin = false
                  let infoContent = []
                  for (let i = 0; i < res.body.data.result.length; i++) {
                    let temp = {}
                    temp.areaName = res.body.data.result[i].area
                    temp.count = res.body.data.result[i].count
                    infoContent.push(temp)
                  }
                  this.infoContent = infoContent
                  return infoContent
                }
              }).then((infoContent) => {
                let html = []
                html.push('<div>')
                infoContent.forEach((content) => {
                  html.push(`<p>${content.areaName} : ${content.count}</p>`)
                })
                html.push('</div>')
                let contentHtml = html.join('')
                this.polygon.on('mouseup', () => {
                  this.infoWindow.setContent(contentHtml)
                  // 获取当前点击的经纬度
                  let clickPosition = []
                  if (this.tableStatus.areaCode === config.AREACODE.YHQ) clickPosition = config.AREAPOSITION.YHQ
                  if (this.tableStatus.areaCode === config.AREACODE.LYX) clickPosition = config.AREAPOSITION.LYX
                  if (this.tableStatus.areaCode === config.AREACODE.WRX) clickPosition = config.AREAPOSITION.WRX
                  if (this.tableStatus.areaCode === config.AREACODE.WXX) clickPosition = config.AREAPOSITION.WXX
                  if (this.tableStatus.areaCode === config.AREACODE.JSX) clickPosition = config.AREAPOSITION.JSX
                  if (this.tableStatus.areaCode === config.AREACODE.XJX) clickPosition = config.AREAPOSITION.XJX
                  if (this.tableStatus.areaCode === config.AREACODE.JX) clickPosition = config.AREAPOSITION.JX
                  if (this.tableStatus.areaCode === config.AREACODE.YQX) clickPosition = config.AREAPOSITION.YQX
                  if (this.tableStatus.areaCode === config.AREACODE.XX) clickPosition = config.AREAPOSITION.XX
                  if (this.tableStatus.areaCode === config.AREACODE.PLX) clickPosition = config.AREAPOSITION.PLX
                  if (this.tableStatus.areaCode === config.AREACODE.RCX) clickPosition = config.AREAPOSITION.RCX
                  if (this.tableStatus.areaCode === config.AREACODE.YJS) clickPosition = config.AREAPOSITION.YJS
                  if (this.tableStatus.areaCode === config.AREACODE.HJS) clickPosition = config.AREAPOSITION.HJS
                  if (this.tableStatus.areaCode === config.AREACODE.YCJJKFQ) clickPosition = config.AREAPOSITION.YCJJKFQ
                  if (this.tableStatus.areaCode === config.AREACODE.KGJJKFQ) clickPosition = config.AREAPOSITION.KGJJKFQ
                  if (this.tableStatus.areaCode === config.AREACODE.FLDJJKFQ) clickPosition = config.AREAPOSITION.FLDJJKFQ
                  if (this.tableStatus.areaCode === config.AREACODE.JXJJKFQ) clickPosition = config.AREAPOSITION.JXJJKFQ
                  this.infoWindow.open(this.map, clickPosition)
                })
              })
            })
          }
          if (tableStatus.reqType === 1 && tableStatus.clickOnEnt) {
            /*
             * 当前状态为 区县风险等级 企业列表
             * 1. 显示 区县 行政区划边界
             * 2. 显示 区县 企业列表的标记点 撒点
             * 3. 点击 某个标记点 显示企业基本信息
             * */
            if (!tableStatus.areaCode) return
            this.showEntList = true
            let areaCode = tableStatus.areaCode
            this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
              // 调用polygon绘制边界
              this.map.clearMap()
              this.addpolygon(bounds)
              this.polygon.setMap(this.map)
              // 调整视图窗口
              this.map.setFitView()
            }).then(() => {
              // 请求markers数据
              let url = data.ent.index_api.api({
                areaName: tableStatus.areaName,
                entName: tableStatus.entName,
                page: tableStatus.pageOption.page,
                limit: tableStatus.pageOption.limit
              })
              this.showSpin = true
              this.$http.jsonp(url).then((res) => {
                if (res.body.status) {
                  this.showSpin = false
                  this.handReqDatas(res.body.data)
                  return
                }
                if (!res.body.status) {
                  ('error')
                  this.showEntList = false
                  return
                }
              })
            })
          }
          if (tableStatus.reqType === 2) {
            /*
             * 当前状态为 站所风险等级 企业列表
             * 1. 显示 区县 行政区划边界
             * 2. 显示 区县 企业列表的标记点 撒点
             * 3. 点击 某个标记点 显示企业基本信息
             * */
            if (!tableStatus.areaCode) return
            this.showEntList = true
            let areaCode = tableStatus.areaCode
            this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
              // 调用polygon绘制边界
              this.map.clearMap()
              this.addpolygon(bounds)
              this.polygon.setMap(this.map)
              // 调整视图窗口
              this.map.setFitView()
            }).then(() => {
              // 请求markers数据
              let url = data.ent.station_api.api({
                areaName: tableStatus.areaName,
                entName: tableStatus.entName,
                page: tableStatus.pageOption.page,
                limit: tableStatus.pageOption.limit
              })
              this.showSpin = true
              this.$http.jsonp(url).then((res) => {
                if (res.body.status) {
                  this.showSpin = false
                  this.handReqDatas(res.body.data)
                  return
                }
                if (!res.body.status) {
                  ('error')
                  this.showEntList = false
                  return
                }
              })
            })
          }
        }
      },
      'tableStatus.pageOption.page'() {
        let tableStatus = this.tableStatus
        if (tableStatus.reqType === 0) {
          this.showEntList = false
          this.map.clearMap()
          return
        }
        if (tableStatus.pageType === 3) {
          /*
           * 当前状态为 区县企业列表数据 pagebar
           * 1. 显示 区县 行政区划边界
           * 2. 显示 区县 企业列表的标记点 撒点
           * 3. 点击 某个标记点 显示企业基本信息
           * */
          this.showEntList = true
          let areaCode = tableStatus.areaCode
          this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
            // 调用polygon绘制边界
            this.map.clearMap()
            this.addpolygon(bounds)
            this.polygon.setMap(this.map)
            // 调整视图窗口
            this.map.setFitView()
          }).then(() => {
            // 请求markers数据
            let url = data.ent.index_api.api({
              areaName: tableStatus.areaName,
              entName: tableStatus.entName,
              page: tableStatus.pageOption.page,
              limit: tableStatus.pageOption.limit
            })
            this.showSpin = true
            this.$http.jsonp(url).then((res) => {
              this.showSpin = false
              if (res.body.status) {
                this.handReqDatas(res.body.data)
                return
              }
              if (!res.body.status) {
                this.showEntList = false
                return
              }
            })
          })
          return
        }
        if (tableStatus.pageType === 4) {
          /*
           * 当前状态为 站所的企业列表数据 pargebar触发
           * 1. 显示 区县 行政区划边界
           * 2. 显示 区县 企业列表的标记点 撒点
           * 3. 点击 某个标记点 显示企业基本信息
           * */
          this.showEntList = true
          let areaCode = tableStatus.areaCode
          this.districtSearch(areaCode.substring(0, 6)).then((bounds) => {
            // 调用polygon绘制边界
            this.map.clearMap()
            this.addpolygon(bounds)
            this.polygon.setMap(this.map)
            // 调整视图窗口
            this.map.setFitView()
          }).then(() => {
            // 请求markers数据
            let url = data.ent.station_api.api({
              areaName: tableStatus.areaName,
              entName: tableStatus.entName,
              page: tableStatus.pageOption.page,
              limit: tableStatus.pageOption.limit
            })
            this.showSpin = true
            this.$http.jsonp(url).then((res) => {
              if (res.body.status) {
                this.showSpin = false
                this.handReqDatas(res.body.data)
                return
              }
              if (!res.body.status) {
                console.log('error')
                this.showEntList = false
                return
              }
            })
          })
          return
        }
      }
    },
    mounted () {
      // 获取当前屏幕高度
      let windowHeight = window.document.documentElement.clientHeight
      this.windowHeight = windowHeight
      // 初始化地图
      this.initMap()
      // 绘制行政区划边界
      this.districtSearch(config.AREACODE.YCS.substring(0, 6)).then((bounds) => {
        // 调用polygon绘制边界
        this.map.clearMap()
        this.addpolygon(bounds)
        this.polygon.setMap(this.map)
//        // 绑定click事件
//        this.polygon.on('click', () => {
//          this.infoWindow.setContent('123132')
//          // 获取当前点击的经纬度
//          let clickPosition = [111.230557, 35.361209]
//          this.infoWindow.open(this.map, clickPosition)
//        })
        // 调整视图窗口
        this.map.setFitView()
      })
    },
    methods: {
      initMap () {
        /* eslint-disable no-new */
        // 1.初始化map对象
        let map = new AMap.Map('map-container', this.mapOptions)
        this.map = map
        // 2.初始化插件 DistrictSearch
        /* eslint-disable no-new */
        new AMap.plugin(['AMap.DistrictSearch'], () => {
          // 返回DistrictSearch对象
          let district = new AMap.DistrictSearch(this.districtOptions)
          this.district = district
        })
        // 3.初始化infoWindow
        let infoWindow = new AMap.InfoWindow(this.infoWindowOptions)
        this.infoWindow = infoWindow
      },
      addMarkers (positions, content) {
        // 初始化 markers 对象
        this.markers = []
        for (let i = 0; i < positions.length; i++) {
          let marker = new AMap.Marker(this.markOptions(positions[i]))
          marker.on('click', () => {
            this.infoWindow.setContent(content)
            this.infoWindow.open(this.map, marker.getPosition())
          })
          this.markers.push(marker)
        }
      },
      addpolygon (bounds) {
        // 初始化Polygon对象
        if (this.polygon) {
          this.polygon = {}
        }
        let polygon = new AMap.Polygon(this.polygonOptions(bounds))
        this.polygon = polygon
      },
      districtSearch (areaCode) {
        /* eslint-disable no-new */
        return new Promise((resolve, reject) => {
          // 如果district不存在，new一个新的
          if (!this.district) {
            AMap.service('AMap.DistrictSearch', () => {
              let district = new AMap.DistrictSearch(this.districtOptions)
              this.district = district
            })
          }
          return resolve(this.district)
        }).then((district) => {
          // 调用district实例
          return new Promise((resolve, reject) => {
            district.search(areaCode, (status, result) => {
              let bounds = result.districtList[0].boundaries
              return resolve(bounds)
            })
          })
        })
      },
      mapBtn() {
        this.isShowMarkers = !this.isShowMarkers
        if (this.isShowMarkers) {
          this.markers.forEach((marker) => {
            marker.show()
          })
          return
        }
        if (!this.isShowMarkers) {
          this.markers.forEach((marker) => {
            marker.hide()
            this.infoWindow.close()
          })
          return
        }
      },
      handReqDatas(datas) {
        return new Promise((resolve, reject) => {
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].position[0]) {
              let marker = new AMap.Marker(this.markOptions(datas[i].position))
              let htmlDatas = {}
              let html = []
              for (let item in datas[i]) {
                if (item !== 'position' && datas[i][item] && item !== 'row_num') {
                  let itemName = config.markersMap(item)
                  htmlDatas[itemName] = datas[i][item]
                }
              }
              html = this.renderView(htmlDatas)
              marker.on('click', () => {
                this.infoWindow.setContent(html.join(''))
                this.infoWindow.open(this.map, marker.getPosition())
              })
              this.markers.push(marker)
            }
          }
        })
      },
      renderView(datas) {
        let html = []
        html.push('<div>')
        for (let item in datas) {
          if (datas[item]) {
            html.push(`<p>${item} : ${datas[item]}</p>`)
          }
        }
        html.push('</div>')
        return html
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .map-wrapper
    position relative
    .spin
      position absolute
      top 50px
      left 50px
    .map-btn
      position absolute
      bottom 10px
      right 10px
    #map-container
      width 100%
</style>
