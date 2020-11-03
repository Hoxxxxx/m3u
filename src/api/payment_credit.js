import request from '@/utils/request'

// 获取付款单贷方单身
export const payCreditList = (params) => {
    return request.get('operations/aph', {}, {
        params
    })
}

// 更新
export const updatePayCredit = (params) => {
    return request.post(`operations/aph/batch`,
        params
    )
}