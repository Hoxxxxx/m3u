import request from '@/utils/request'

// 新增流程
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

// 流程详情
export const workflowsList = (params) => {
  return request.get(`oa/workflows/${params.workid}`,
  {},
  {
    params
  })
}

// 修改杂项应付款请款作业
export const editFlow = (params) => {
  return request.put(`oa/workflows/${params.workid}`,
  params)
}