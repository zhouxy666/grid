/**
 * Created by zxy on 2017/5/27.
 */
module.exports = {
  build: {
    host: 'http://60.222.220.223:8001/grid',
    port: '80'
  },
  AREACODE: {
    YCS: '140800000000',
    YHQ: '140802000000',
    LYX: '140821000000',
    WRX: '140822000000',
    WXX: '140823000000',
    JSX: '140824000000',
    XJX: '140825000000',
    JX: '140826000000',
    YQX: '140827000000',
    XX: '140828000000',
    PLX: '140829000000',
    RCX: '140830000000',
    YJS: '140881000000',
    HJS: '140882000000',
    YCJJKFQ: '140831000000',
    KGJJKFQ: '140832000000',
    FLDJJKFQ: '140833000000',
    JXJJKFQ: '140834000000'
  },
  AREAPOSITION: {
    YCS: [111.010653, 35.032204],
    YHQ: [111.010653, 35.032204],
    LYX: [110.780898, 35.150052],
    WRX: [110.845677, 35.423025],
    WXX: [111.224175, 35.364358],
    JSX: [110.989035, 35.612288],
    XJX: [111.225916, 35.624019],
    JX: [111.574161, 35.49731],
    YQX: [111.672192, 35.303473],
    XX: [111.220601, 35.146524],
    PLX: [111.219493, 34.843835],
    RCX: [110.699696, 34.698865],
    YJS: [110.454291, 34.874294],
    HJS: [110.720036, 35.602408],
    YCJJKFQ: [111.011098, 35.078776],
    KGJJKFQ: [111.071911, 35.101332],
    FLDJJKFQ: [110.338441, 34.634367],
    JXJJKFQ: [111.667846, 35.514639]
  },
  markersMap(name) {
    let mapName = ''
    switch (name) {
      case 'ent_name':
        mapName = '企业名称'
        break
      case 'ent_type':
        mapName = '企业类型'
        break
      case 'legal':
        mapName = '联系方式'
        break
      case 'principal':
        mapName = '企业负责人'
        break
      case 'ent_site':
        mapName = '企业地址'
        break
      case 'ent_business':
        mapName = '主营业务'
        break
      default:
        break
    }
    return mapName
  }
}
