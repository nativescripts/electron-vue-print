import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: require('@/components/ScannerPage/ScannerPage').default
    },
    {
      path: '/printer',
      name: 'printer',
      component: require('@/components/PrinterPage/PrinterPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
