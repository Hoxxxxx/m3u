import request from '@/utils/request'

// 获取杂项应付款请款作业列表
export const paymentList = (params) => {
    return request.get('operations/aapt120',
    {},
    {
        params
    })
}

// 获取单个杂项应付款请款作业
export const paymentSingle = (params) => {
    return request.get(`operations/aapt120/${params.id}`,
    {},
    {})
}

// 新增杂项应付款请款作业
export const addPayment = (params) => {
    return request.post(`operations/aapt120`,
        params
    )
}

// 修改杂项应付款请款作业
export const editPayment = (data) => {
    return request.put(`operations/aapt120/${data.id}`,
    data)
}

// 删除杂项应付款请款作业列表
export const delPayment = (id) => {
    return request.delete(`operations/aapt120/${id}`,
    {})
}