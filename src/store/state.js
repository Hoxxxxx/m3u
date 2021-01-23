let workInfo = sessionStorage.getItem('workInfo') ? JSON.parse(sessionStorage.getItem('workInfo')) : {}
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
let companyInfo = sessionStorage.getItem('companyInfo') ? JSON.parse(sessionStorage.getItem('companyInfo')) : {}
const state = {
  workInfo: workInfo,
  userInfo: userInfo,
  companyInfo: companyInfo,
  upload_url: `${process.env.VUE_APP_BASE_API}files/upload`,
  //自定义表单数据
  form:{},
  //当前选中的单元格
  choosedTd:{
    // form_index:null,//单元格所在的最外层控件
    // area_index:null,//单元格所在的内容块
    // line_index:null,//单元格所在的行
    // td_index:null//当前选中的单元格
  },
}
export default state
