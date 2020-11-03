import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const workList = () => import('@/views/workList/workList')
const entryPapers = () => import('@/views/entryPapers/entryPapers') //分录底稿
const directPay = () => import('@/views/directPay/directPay') //直接付款 
const writeOff =() => import('@/views/writeOff/writeOff') //冲账
const aglt110 = () => import('@/views/aglt110/aglt110') // 一般凭证
const aapt150 = () => import('@/views/aapt150/aapt150') // 厂商预付款
const aapt120 = () => import('@/views/aapt120/aapt120') // 杂项应付款请款作业
const aapt330 = () => import('@/views/aapt330/aapt330') // 付款冲账
const aapt151 = () => import('@/views/aapt151/aapt151') //借支单维护作业
const aapt121 = () => import('@/views/aapt121/aapt121') //报销还款维护作业
const axrt300 = () => import('@/views/axrt300/axrt300') //应收款张维护作业
const axrt400 = () => import('@/views/axrt400/axrt400') //收款冲账单维护作业
const anmt302 = () => import('@/views/anmt302/anmt302') //银行存款收支维护作业
const afai100 = () => import('@/views/afai100/afai100') //固定资产维护作业
const afai104 = () => import('@/views/afai104/afai104') //应收款张维护作业
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
  // 一般凭证
  {
    path: '/aglt110',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aglt110',
        component: aglt110
      }
    ]
  },
  // 厂商预付款
  {
    path: '/aapt150',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aapt150',
        component: aapt150
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      },
      {
        path: 'writeOff', //冲账
        name: 'writeOff',
        component: writeOff
      },
      {
        path: 'directPay', //直接付款
        name: 'directPay',
        component: directPay
      }
    ]
  },
  // 杂项应付款请款作业
  {
    path: '/aapt120',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aapt120',
        component: aapt120
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      },
      {
        path: 'writeOff', //冲账
        name: 'writeOff',
        component: writeOff
      },
      {
        path: 'directPay', //直接付款
        name: 'directPay',
        component: directPay
      }
    ]
  },
  // 付款冲账
  {
    path: '/aapt330',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aapt330',
        component: aapt330
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      },
    ]
  },
  // 借支单维护作业
  {
    path: '/aapt151',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aapt151',
        component: aapt151
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      },
      {
        path: 'writeOff', //冲账
        name: 'writeOff',
        component: writeOff
      }
    ]
  },
  // 报销还款维护作业
  {
    path: '/aapt121',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'aapt121',
        component: aapt121
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      },
      {
        path: 'writeOff', //冲账
        name: 'writeOff',
        component: writeOff
      }
    ]
  },
  // 应收款张维护作业
  {
    path: '/axrt300',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'axrt300',
        component: axrt300
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      }
    ]
  },
  // 收款冲账单维护作业
  {
    path: '/axrt400',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'axrt400',
        component: axrt400
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      }
    ]
  },
  // 银行存款收支维护作业
  {
    path: '/anmt302',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'anmt302',
        component: anmt302
      },
      {
        path: 'entryPapers', //分录底稿
        name: 'entryPapers',
        component: entryPapers
      }
    ]
  },
  // 固定资产维护作业
  {
    path: '/afai100',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'afai100',
        component: afai100
      }
    ]
  },
  // 拆旧分录维护作业
  {
    path: '/afai104',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'afai104',
        component: afai104
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
