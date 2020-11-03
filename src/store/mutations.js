import * as types from './mutation-types'
const mutations = {
  [types.CHANGE_WORK_INFO](state, val) {
    state.workInfo = val ? val : {}
    sessionStorage.setItem('workInfo', JSON.stringify(state.workInfo))
  },
  [types.CHANGE_USER_INFO](state, val) {
    state.userInfo = val ? val : {}
    sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  [types.CHANGE_COMPANY_INFO](state, val) {
    state.companyInfo = val ? val : {}
    sessionStorage.setItem('companyInfo', JSON.stringify(state.companyInfo))
  }
}
export default mutations