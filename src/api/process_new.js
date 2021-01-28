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
  return request.get(`oa/workflows/${params.workid}`, {}, {
    params
  })
}

// 修改流程
export const editFlow = (params) => {
  return request.put(`oa/workflows/${params.workid}`,
    params)
}

// 抛转凭证

export const transfer = (params) => {
  return request.post(`oa/workflows/transfer`,
    params)
}

//获取页面数据移动端
export const h5Data = (params) => {
  return request.get(`oa/workflows/${params.workid}`, {}, {
    params
  })
}

// 获取h5新增流程时的数据
export const h5DataAdd = (params) => {
  return request.get(`oa/workflows/template/${params.tplid}`, {}, {
    params
  })
}
