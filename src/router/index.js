import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Transfer from '../views/Transfer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    }
  ]
})
