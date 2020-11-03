import request from '@/utils/request'

// 获取发票列表
export const invoiceList = (params) => {
    return request.get('operations/apk',
    {},
    {
        params
    })
}

// 更新发票信息
export const updateInvoice = (params) => {
    return request.post(`operations/apk/batch`,
        params
    )
}
