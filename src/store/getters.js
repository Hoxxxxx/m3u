const getters = {
  workName(state) {
    return state.workInfo.name
  },
  userName(state) {
    return state.userInfo.name
  },
  companyName(state) {
    return state.companyInfo.name
  }
}
export default getters