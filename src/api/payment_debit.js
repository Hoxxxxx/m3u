import request from '@/utils/request'

// 获取付款单借方单身
export const payDebitList = (params) => {
    return request.get('operations/apg', {}, {
        params
    })
}

// 更新
export const updatePayDebit = (params) => {
    return request.post(`operations/apg/batch`,
        params
    )
}


// 获取Apg信息
export const getApg = (params) => {
    return request.get(`operations/apg/jtApg`,
        params
    )
}