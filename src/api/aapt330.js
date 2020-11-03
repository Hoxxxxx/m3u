import request from '@/utils/request'

// 获取付款冲账单维护作业列表
export const paymentList = (params) => {
    return request.get('operations/aapt330', 
    {}, 
    {
        params
    })
}

// 获取单个付款冲账单维护作业
export const paymentSingle = (params) => {
    return request.get(`operations/aapt330/${params.id}`, {}, {})
}

// 新增付款冲账单维护
export const addPayment = (params) => {
    return request.post(`operations/aapt330`,
        params
    )
}

// 修改付款冲账单维护
export const editPayment = (data) => {
    return request.put(`operations/aapt330/${data.id}`,
        data)
}
// 删除付款冲账单维护作业
export const delPayment = (params) => {
    return request.delete(`operations/aapt330/${params.id}`, {})
}
