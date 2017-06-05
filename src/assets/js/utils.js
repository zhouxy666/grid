/**
 * Created by zxy on 2017/5/28.
 */
const config = require('@/assets/js/config')
module.exports = {
  formatAreaCode: (num) => {
    let areacode = ''
    if (num === 0) return config.AREACODE.YHQ
    if (num === 1) return config.AREACODE.JSX
    if (num === 2) return config.AREACODE.YJS
    if (num === 3) return config.AREACODE.WRX
    if (num === 4) return config.AREACODE.LYX
    if (num === 5) return config.AREACODE.RCX
    if (num === 6) return config.AREACODE.XJX
    if (num === 7) return config.AREACODE.HJS
    if (num === 8) return config.AREACODE.WXX
    if (num === 9) return config.AREACODE.XX
    if (num === 10) return config.AREACODE.JX
    if (num === 11) return config.AREACODE.PLX
    if (num === 12) return config.AREACODE.RCX
    return areacode
  }
}
