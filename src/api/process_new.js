import request from '@/utils/request'

// 新增流程
export const addFlow = (params) => {
  return request.post('oa/workflows',
      params
  )
}

// 流程详情
export const workflowsList = (params) => {
  return request.get(`oa/workflows/${params.workid}`,
  {},
  {
    params
  })
}