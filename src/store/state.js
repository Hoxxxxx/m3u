let workInfo = sessionStorage.getItem('workInfo') ? JSON.parse(sessionStorage.getItem('workInfo')) : {}
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
let companyInfo = sessionStorage.getItem('companyInfo') ? JSON.parse(sessionStorage.getItem('companyInfo')) : {}
const state = {
  workInfo: workInfo,
  userInfo: userInfo,
  companyInfo: companyInfo,

  upload_url: 'http://test-erp.hualumedia.com/api/v2/files/upload'
}
export default state