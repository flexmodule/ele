import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import Shop from '@/components/shop'
import Seller from '@/components/seller'
import Order from '@/components/order'
import Profile from '@/components/profile'
import Discover from '@/components/discover'
import Common from '@/components/common'
import Kindlist from '@/components/kindlist'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
        {
          path: '/',
          redirect:"/common/home",
        },
        {
          path: '/kindlist',
         component: Kindlist,
        },
        {
          path: '/profile',
          redirect:"/common/profile",
        },
        {
          path: '/discover',
          redirect:"/common/discover",
        },
        {
          path: '/order',
          redirect:"/common/order",
        },
       {
      path: '/common',
      component: Common,
      children:[
        {
          path: 'profile',
          component: Profile
        },
         {
          path: 'home',
          component: Home,
        },
        {
          path: 'discover',
          component: Discover
        },
         {
          path: 'order',
          component: Order
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children:[
      {
        path: 'shop',
       component: Shop, 
      }
      ]
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path:"*",  //任何路径都会匹配到主页组件中
      redirect:"/common/home",
    }
  ]
})
