import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const workList = () => import('@/views/workList/workList')
const adCharge = () => import('@/views/adCharge_01/adCharge') // 一般凭证
const steady = () => import('@/views/steady/steady') // 固定资产
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/workList',
    component: Home,
    children: [
      {
        path: '/workList',
        name: 'workList',
        component: workList
      }
    ]
  },
  // 预付款申请
  {
    path: '/adCharge',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'adCharge',
        component: adCharge
      }
    ]
  },
  // 固定资产
  {
    path: '/steady',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'steady',
        component: steady
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 防止点击logo回到主页时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
