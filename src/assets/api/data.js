/**
 * Created by zxy on 2017/5/27.
 */
let config = require('./config')
let www = config.build.host
module.exports = {
  main: {
    des: '运城市 网格化总体统计数据',
    api: (areaName) => {
      return www + '/index.php/city/index?areaName=' + areaName
    }
  },
  risk: {
    des: '区县 企业风险等级 列表数据',
    api: (params) => {
      return www + '/index.php/risk/index?areaName=' + params.areaName + '&entName=' + params.entName + '&page=' + params.page + '&limit=' + params.limit
    }
  },
  station: {
    des: '站所 企业风险等级 列表数据',
    api: (params) => {
      return www + '/index.php/station/index?areaName=' + params.areaName + '&entName=' + params.entName + '&page=' + params.page + '&limit=' + params.limit
    }
  },
  town: {
    des: '区县数据请求',
    api: (areaName) => {
      return www + '/index.php/town/index?areaName=' + areaName
    }
  },
  chart: {
    index_api: {
      des: '请求首页的chart数据',
      api: www + '/index.php/chart/index'
    },
    town_api: {
      des: '请求区县的chart数据',
      api: (araName) => {
        return www + '/index.php/chart/town?areaName=' + araName
      }
    },
    ent_api: {
      des: '请求区县某个类型企业的chart数据',
      api: (params) => {
        return www + '/index.php/chart/ent?areaName=' + params.areaName + '&entName=' + params.entName
      }
    },
    station_api: {
      des: '请求站所某个类型企业的chart数据',
      api: (params) => {
        return www + '/index.php/chart/station?areaName=' + params.areaName + '&entName=' + params.entName
      }
    }
  },
  law: {
    index_api: {
      des: '请求执法列表信息',
      api: (lawId) => {
        return www + '/index.php/law/index?law_id=' + lawId
      }
    }
  },
  ent: {
    des: '企业详情',
    api: (name) => {
      return www + '/index.php/enterprise/index?name=' + name
    }
  }
}

