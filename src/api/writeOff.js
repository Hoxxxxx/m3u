import request from '@/utils/request'

// 获取冲账列表
export const writeOffList = (params) => {
    return request.get('operations/apv',
    {},
    {
        params
    })
}

// 更新冲账信息
export const updateWriteOff = (params) => {
    return request.post(`operations/apv/batch`,
        params
    )
}

// 获取apv信息
export const getApv = (params) => {
    return request.get('operations/apv/jtApv',
    {},
    {
        params
    })
}
