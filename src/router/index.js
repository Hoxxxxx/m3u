import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const workList = () => import('@/views/workList/workList')
const error = () => import('@/components/error')
const apply = () => import('@/views/allProcess/apply') // 申请
const agree = () => import('@/views/allProcess/agree') // 同意
const reject = () => import('@/views/allProcess/reject') // 拒绝
const back = () => import('@/views/allProcess/back') // 退回

// 申请单
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/workList',
    children: [{
      path: '/workList',
      name: 'workList',
      component: workList
    }]
  },
  {
    path: '/error',
    component: error,
  },
  // 申请人签批
  {
    path: '/apply',
    name: 'apply',
    component: apply
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
  // 通用搭建
  {
    path: '/usual',
    name: 'usual',
    component: () => import('@/views/usualPage/usualHome')
  },
  // 出差借款申请
  {
    path: '/borrowTra',
    name: 'borrowTra',
    component: () => import('@/views/works/borrowTra/newProcess')
  },
  {
    path: '/borrowTra/check',
    name: 'borrowTra_check',
    component: () => import('@/views/works/borrowTra/check')
  },
  {
    path: '/borrowTra/approval',
    name: 'borrowTra_approval',
    component: () => import('@/views/works/borrowTra/newApproval')
  },
  {
    path: '/borrowTra/printPage',
    name: 'borrowTra_printPage',
    component: () => import('@/views/works/borrowTra/printPage')
  },

  // 外地差旅报销单
  {
    path: '/travel',
    name: 'travel',
    component: () => import('@/views/works/travel/newProcess')
  },
  {
    path: '/travel/check',
    name: 'travel_check',
    component: () => import('@/views/works/travel/check')
  },
  {
    path: '/travel/approval',
    name: 'travel_approval',
    component: () => import('@/views/works/travel/newApproval')
  },
  {
    path: '/travel/printPage',
    name: 'travel_printPage',
    component: () => import('@/views/works/travel/printPage')
  },

  // 其他费用报销
  {
    path: '/otherFees',
    name: 'otherFees',
    component: () => import('@/views/works/otherFees/newProcess')
  },
  {
    path: '/otherFees/check',
    name: 'otherFees_check',
    component: () => import('@/views/works/otherFees/check')
  },
  {
    path: '/otherFees/approval',
    name: 'otherFees_approval',
    component: () => import('@/views/works/otherFees/newApproval')
  },
  {
    path: '/otherFees/printPage',
    name: 'otherFees_printPage',
    component: () => import('@/views/works/otherFees/printPage')
  },


  // 借款申请
  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('@/views/works/borrow/newProcess')
  },
  {
    path: '/borrow/check',
    name: 'borrow_check',
    component: () => import('@/views/works/borrow/check')
  },
  {
    path: '/borrow/approval',
    name: 'borrow_approval',
    component: () => import('@/views/works/borrow/newApproval')
  },
  {
    path: '/borrow/printPage',
    name: 'borrow_printPage',
    component: () => import('@/views/works/borrow/printPage')
  },

  // 固定资产申请
  {
    path: '/fixedApp',
    name: 'fixedApp',
    component: () => import('@/views/works/fixedApp/newProcess')
  },
  {
    path: '/fixedApp/check',
    name: 'fixedApp_check',
    component: () => import('@/views/works/fixedApp/check')
  },
  {
    path: '/fixedApp/approval',
    name: 'fixedApp_approval',
    component: () => import('@/views/works/fixedApp/newApproval')
  },
  {
    path: '/fixedApp/printPage',
    name: 'fixedApp_printPage',
    component: () => import('@/views/works/fixedApp/printPage')
  },

  // 固定资产卡片
  {
    path: '/fixedCard',
    name: 'fixedCard',
    component: () => import('@/views/works/fixedCard/newProcess')
  },
  {
    path: '/fixedCard/check',
    name: 'fixedCard_check',
    component: () => import('@/views/works/fixedCard/check')
  },
  {
    path: '/fixedCard/approval',
    name: 'fixedCard_approval',
    component: () => import('@/views/works/fixedCard/newApproval')
  },
  {
    path: '/fixedCard/printPage',
    name: 'fixedCard_printPage',
    component: () => import('@/views/works/fixedCard/printPage')
  },

  // 固定资产付款
  {
    path: '/fixedPay',
    name: 'fixedPay',
    component: () => import('@/views/works/fixedPay/newProcess')
  },
  {
    path: '/fixedPay/check',
    name: 'fixedPay_check',
    component: () => import('@/views/works/fixedPay/check')
  },
  {
    path: '/fixedPay/approval',
    name: 'fixedPay_approval',
    component: () => import('@/views/works/fixedPay/newApproval')
  },
  {
    path: '/fixedPay/printPage',
    name: 'fixedPay_printPage',
    component: () => import('@/views/works/fixedPay/printPage')
  },
  // 付款冲账申请
  {
    path: '/r0103',
    name: 'r0103',
    component: () => import('@/views/works/r0103/newProcess') 
  },
  {
    path: '/r0103/check',
    name: 'r0103_check',
    component: () => import('@/views/works/r0103/check')
  },
  {
    path: '/r0103/approval',
    name: 'r0103_approval',
    component: () => import('@/views/works/r0103/newApproval')
  },
  {
    path: '/r0103/printPage',
    name: 'r0103_printPage',
    component: () => import('@/views/works/r0103/printPage')
  },

  // 预付款申请
  {
    path: '/r0101',
    name: 'r0101',
    component: () => import('@/views/works/r0101/newProcess')
  },
  {
    path: '/r0101/check',
    name: 'r0101_check',
    component: () => import('@/views/works/r0101/check')
  },
  {
    path: '/r0101/approval',
    name: 'r0101_approval',
    component: () => import('@/views/works/r0101/newApproval')
  },
  {
    path: '/r0101/printPage',
    name: 'r0101_printPage',
    component: () => import('@/views/works/r0101/printPage')
  },

  // 付款申请
  {
    path: '/r0102',
    name: 'r0102',
    component: () => import('@/views/works/r0102/newProcess')
  },
  {
    path: '/r0102/check',
    name: 'r0102_check',
    component: () => import('@/views/works/r0102/check')
  },
  {
    path: '/r0102/approval',
    name: 'r0102_approval',
    component: () => import('@/views/works/r0102/newApproval')
  },
  {
    path: '/r0102/printPage',
    name: 'r0102_printPage',
    component: () => import('@/views/works/r0102/printPage')
  },

  // 发货单
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('@/views/works/invoice/newProcess')
  },
  {
    path: '/invoice/check',
    name: 'invoice_check',
    component: () => import('@/views/works/invoice/check')
  },
  {
    path: '/invoice/approval',
    name: 'invoice_approval',
    component: () => import('@/views/works/invoice/newApproval')
  },
  {
    path: '/invoice/printPage',
    name: 'invoice_printPage',
    component: () => import('@/views/works/invoice/printPage')
  },
  // 发货单
  {
    path: '/invoiceApply',
    name: 'invoiceApply',
    component: () => import('@/views/works/invoiceApply/newProcess')
  },
  {
    path: '/invoiceApply/check',
    name: 'invoiceApply_check',
    component: () => import('@/views/works/invoiceApply/check')
  },
  {
    path: '/invoiceApply/approval',
    name: 'invoiceApply_approval',
    component: () => import('@/views/works/invoiceApply/newApproval')
  },
  {
    path: '/invoiceApply/printPage',
    name: 'invoiceApply_printPage',
    component: () => import('@/views/works/invoiceApply/printPage')
  },
  // 合同审批
  {
    path: '/contract',
    name: 'contract',
    component: () => import('@/views/works/contract/newProcess')
  },
  {
    path: '/contract/check',
    name: 'contract_check',
    component: () => import('@/views/works/contract/check')
  },
  {
    path: '/contract/approval',
    name: 'contract_approval',
    component: () => import('@/views/works/contract/newApproval')
  },
  {
    path: '/contract/printPage',
    name: 'contract_printPage',
    component: () => import('@/views/works/contract/printPage')
  },
  // 退货单
  {
    path: '/cancelinvoice',
    name: 'cancelinvoice',
    component: () => import('@/views/works/cancelinvoice/newProcess')
  },
  {
    path: '/cancelinvoice/check',
    name: 'cancelinvoicecheck',
    component: () => import('@/views/works/cancelinvoice/check')
  },
  {
    path: '/cancelinvoice/approval',
    name: 'cancelinvoiceapproval',
    component: () => import('@/views/works/cancelinvoice/newApproval')
  },
  {
    path: '/cancelinvoice/printPage',
    name: 'cancelinvoiceprintPage',
    component: () => import('@/views/works/cancelinvoice/printPage')
  },
  // 红字发票申请
  {
    path: '/redinvoice',
    name: 'redinvoice',
    component: () => import('@/views/works/redinvoice/newProcess')
  },
  {
    path: '/redinvoice/check',
    name: 'redinvoicecheck',
    component: () => import('@/views/works/redinvoice/check')
  },
  {
    path: '/redinvoice/approval',
    name: 'redinvoiceapproval',
    component: () => import('@/views/works/redinvoice/newApproval')
  },
  {
    path: '/redinvoice/printPage',
    name: 'redinvoiceprintPage',
    component: () => import('@/views/works/redinvoice/printPage')
  },
  // 新增签约方申请单
  {
    path: '/signing',
    name: 'signing',
    component: () => import('@/views/works/signing/newProcess')
  },
  {
    path: '/signing/check',
    name: 'signing_check',
    component: () => import('@/views/works/signing/check')
  },
  {
    path: '/signing/approval',
    name: 'signing_approval',
    component: () => import('@/views/works/signing/newApproval')
  },
  {
    path: '/signing/printPage',
    name: 'signing_printPage',
    component: () => import('@/views/works/signing/printPage')
  },
  // 移动端
  {
    path: '/h5/general',
    name: 'general',
    component: () => import('@/views/h5/general')
  },
  {
    path: '/h5/toss',
    name: 'toss',
    component: () => import('@/views/h5/toss')
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


import {
  getToken
} from '@/api/basic'
import jwtDecode from 'jwt-decode'
	
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token")
  let curUrl = window.location.href
  console.log(curUrl)
  if (token) {
    const code = jwtDecode(token)
    let now = Math.round(new Date() / 1000)
    let exp = code.exp
    if (now < exp) {
      next()
    } else {
      window.sessionStorage.clear()
      // next('/error')
      window.location.href = `${process.env.VUE_APP_URL}/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}` 
    }
  } else {
    if (window.location.href.includes('code')) {
      let urlParams = window.location.href.split('?')[1].split('&')
      let allParams = {}
      urlParams.forEach(item => {
        let key = item.split('=')[0]
        let val = item.split('=')[1]
        allParams[key] = val
      })
      console.log(allParams)
      let params = {
        code: allParams.code
      }
      getToken(params).then(res => {
        if (res.status == 200) {
          let token = res.data.token
          const code = jwtDecode(token)
          let oauserinfo = {
            oauserid:code.oauserid,
            oaname:code.oaname
          }
          sessionStorage.setItem('exp',code.exp)
          sessionStorage.setItem('oauserinfo',JSON.stringify(oauserinfo))
          sessionStorage.setItem('OrgId', allParams.orgid ? allParams.orgid : code.orgid)
          sessionStorage.setItem('token', token)
          delete allParams.code 
          next({
            path: to.path,
            query: allParams
          })
        } else {
          console.log('token获取失败！')
          delete allParams.code
          let paraStr = ''
          console.log(111,allParams)
          for(let key in allParams){
            paraStr += `&${key}=${allParams[key]}`
          }
          let urlStr = window.location.href.split('?')[0]
          let nowUrl = `${urlStr}?${paraStr.substring(1)}`
          console.log(nowUrl)
          window.location.href = `${process.env.VUE_APP_URL}/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${nowUrl}`
        }
      })
    } else {
      console.log('无token，无code：',curUrl)
      window.sessionStorage.clear()
      window.location.href = `${process.env.VUE_APP_URL}/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
      // 通过判断path防止出现死循环
      // if (to.path === '/error') {
      //   next()
      // } else {
      //   next('/error')
      // }
    }
  }
})


export default router