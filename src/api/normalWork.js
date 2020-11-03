import request from '@/utils/request'

// 获取付款单贷方单身
export const normalList = (params) => {
    return request.get('operations/abb', {}, {
        params
    })
}

// 更新
export const updatenormal = (params) => {
    return request.post(`operations/abb/batch`,
        params
    )
}