import request from '@/utils/request'

// 获取应付请款单身
export const payDueList = (params) => {
    return request.get('operations/apb',
    {},
    {
        params
    })
}

// 更新
export const updatePayDue = (params) => {
    return request.post(`operations/apb/batch`,
        params
    )
}
