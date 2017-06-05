import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Demo from '@/components/Demo'
import Table from '@/components/Table'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})
