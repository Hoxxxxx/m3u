import request from '@/utils/request'

// 新增管理员
export const addFlow = (params) => {
  return request.post('oa/workflows',
      params
  )
}