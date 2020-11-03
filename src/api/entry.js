import request from '@/utils/request'

// 获取分录底稿列表
export const entryList = (params) => {
    return request.get('operations/npq',
    {},
    {
        params
    })
}

// 更新分录底稿信息
export const updateEntry = (params) => {
    return request.post(`operations/npq/batch`,
        params
    )
}
