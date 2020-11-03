import * as types from './mutation-types'
const actions = {
  [types.CHANGE_WORK_INFO]({ commit }, val) {
    commit(types.CHANGE_WORK_INFO, val)
  }
}
export default actions