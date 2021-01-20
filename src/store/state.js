let workInfo = sessionStorage.getItem('workInfo') ? JSON.parse(sessionStorage.getItem('workInfo')) : {}
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
let companyInfo = sessionStorage.getItem('companyInfo') ? JSON.parse(sessionStorage.getItem('companyInfo')) : {}
const state = {
  workInfo: workInfo,
  userInfo: userInfo,
  companyInfo: companyInfo,
  upload_url: `${process.env.VUE_APP_BASE_API}files/upload`,
  form:{},//自定义表单数据
  // filter_tplid:{
  //   FILTER_GDZCSQD: process.env.NODE_ENV == 'development' ? '8946': (orgid == 1 ? '8910' : (orgid == 2 ? '8952' : '8924')),//固定资产申请单
  //   FILTER_CCSQD: process.env.NODE_ENV == 'development' ? '8941': (orgid == 1 ? '8906' : (orgid == 2 ? '8948' : '8920')),//出差申请单
  //   FILTER_FKSQD: process.env.NODE_ENV == 'development' ? '8950': (orgid == 1 ? '8914' : (orgid == 2 ? '8956' : '8928')),//付款申请单
  // }
}
export default state
