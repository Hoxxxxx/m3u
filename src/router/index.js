import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const workList = () => import('@/views/workList/workList')
const newPro = () => import('@/views/allProcess/newProcess') // 新建流程
const apply = () => import('@/views/allProcess/apply') // 申请
const newApp = () => import('@/views/allProcess/newApproval') // 新建流程
const agree = () => import('@/views/allProcess/agree') // 同意
const reject = () => import('@/views/allProcess/reject') // 拒绝
const back = () => import('@/views/allProcess/back') // 退回
const check = () => import('@/views/allProcess/check') // 退回

// 申请单
const travelExpense = () => import('@/views/works/travelExpense') // 外地差旅报销单
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/workList',
    children: [
      {
        path: '/workList',
        name: 'workList',
        component: workList
      }
    ]
  },
  // 新建流程
  {
    path: '/newPro',
    name: 'newPro',
    component: newPro
  },
  // 申请人签批
  {
    path: '/apply',
    name: 'apply',
    component: apply
  },
  // 审批人进入
  {
    path: '/approvalPro',
    name: 'newApp',
    component: newApp
  },
  // 审批人同意
  {
    path: '/agree',
    name: 'agree',
    component: agree
  },
  // 审批人拒绝
  {
    path: '/reject',
    name: 'reject',
    component: reject
  },
  // 审批人退回
  {
    path: '/back',
    name: 'back',
    component: back
  },
  // 查看
  {
    path: '/check',
    name: 'check',
    component: check
  },
  // 借款申请
  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('@/views/works/borrow/newProcess')
  },

  // 外地差旅报销单
  {
    path: '/travelExpense',
    name: 'travelExpense',
    component: travelExpense
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
