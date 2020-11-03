import request from '@/utils/request'

// 获取一般凭证的列表
export const paymentList = (params) => {
    return request.get('operations/aglt110',
    {},
    {
        params
    })
}

// 获取单个一般凭证
export const paymentSingle = (params) => {
    return request.get(`operations/aglt110/${params.id}`,
    {},
    {})
}

// 新增杂项应付款请款作业
export const addPayment = (params) => {
    return request.post(`operations/aglt110`,
        params
    )
}

// 修改杂项应付款请款作业
export const editPayment = (data) => {
    return request.put(`operations/aglt110/${data.id}`,
    data)
}

// 删除杂项应付款请款作业列表
export const delPayment = (id) => {
    return request.delete(`operations/aglt110/${id}`,
    {})
}

// 审核
export const examine = (params) => {
    return request.post(`operations/aglt110/${params.operation_code}/verify`,
        params
    )
  }
  
  // 取消审核
  export const examine_cancel = (params) => {
    return request.post(`operations/aglt110/${params.operation_code}/cancel-verification`,
        params
    )
  }
  
  // 凭证过账
  export const postVoucher = (params) => {
    return request.post(`operations/aglt110/${params.operation_code}/post`,
        params
    )
  }
  
  // 过账还原
  export const postVoucher_cancel = (params) => {
    return request.post(`operations/aglt110/${params.operation_code}/cancel-post`,
        params
    )
  }