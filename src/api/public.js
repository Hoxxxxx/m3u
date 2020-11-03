import request from '@/utils/request'

// 生成分录
export const createEntry = (params) => {
  return request.post(`operations/do/generate-draft-entries`,
      params
  )
}

// 审核
export const examine = (params) => {
  return request.post(`operations/do/verify`,
      params
  )
}

// 取消审核
export const examine_cancel = (params) => {
  return request.post(`operations/do/cancel-verification`,
      params
  )
}

// 抛转凭证
export const tossVoucher = (params) => {
  return request.post(`operations/do/throw`,
      params
  )
}

// 抛转凭证还原
export const tossVoucher_cancel = (params) => {
  return request.post(`operations/do/cancel-throw`,
      params
  )
}
