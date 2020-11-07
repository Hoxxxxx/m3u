import request from '@/utils/request'

// 新增管理员
export const addFlow = (params) => {
  return request.post('oa/workflows',
      params
  )
}

// 流程审批
export const transact = (params) => {
  return request.post('oa/workflows/transact',
      params
  )
}