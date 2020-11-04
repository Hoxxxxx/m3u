import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const workList = () => import('@/views/workList/workList')
const adCharge = () => import('@/views/adCharge_01/adCharge') // 一般凭证
const apply = () => import('@/views/operations/apply') // 申请
const agree = () => import('@/views/operations/agree') // 同意
const reject = () => import('@/views/operations/reject') // 拒绝
const back = () => import('@/views/operations/back') // 退回
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
  // 申请
  {
    path: '/apply',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'apply',
        component: apply
      }
    ]
  },
  // 同意
  {
    path: '/agree',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'agree',
        component: agree
      }
    ]
  },
  // 拒绝
  {
    path: '/reject',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'reject',
        component: reject
      }
    ]
  },
  // 同意
  {
    path: '/back',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'back',
        component: back
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
