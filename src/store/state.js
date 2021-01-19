let workInfo = sessionStorage.getItem('workInfo') ? JSON.parse(sessionStorage.getItem('workInfo')) : {}
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
let companyInfo = sessionStorage.getItem('companyInfo') ? JSON.parse(sessionStorage.getItem('companyInfo')) : {}
const state = {
  workInfo: workInfo,
  userInfo: userInfo,
  companyInfo: companyInfo,
  upload_url: `${process.env.VUE_APP_BASE_API}files/upload`,
  form:{},//自定义表单数据
}
export default state