// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import AMap from 'vue-amap'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/stylus/index.styl'
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(iView)
// Vue.use(AMap)
// AMap.initAMapApiLoader({
//   key: 'e2592b77d16da67df53b352025685edc',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
