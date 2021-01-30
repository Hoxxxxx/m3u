import request from '@/utils/request'

// 获取token

export const getToken = (params) => {
  return request.post('hr/authorizations',
      params
  )
}

// 获取账套列表
export const sobsList = (params) => {
  return request.get('meta/sobs',
  {},
  {
    params
  })
}

// 获取部门列表
export const gemsList = (params) => {
  return request.get('meta/gems',
  {},
  {
    params
  })
}

// 获取员工列表
export const gensList = (params) => {
  return request.get('meta/gens',
  {},
  {
    params
  })
}

// 获取账款类型列表
export const aprsList = (params) => {
  return request.get('meta/aprs',
  {},
  {
    params
  })
}

// 获取币别列表
export const azisList = (params) => {
  return request.get('meta/azis',
  {},
  {
    params
  })
}

// 获取付款方式列表
export const pmasList = (params) => {
  return request.get('meta/pmas',
  {},
  {
    params
  })
}

// 获取税别列表
export const gecsList = (params) => {
  return request.get('meta/gecs',
  {},
  {
    params
  })
}

// 获取项目列表
export const pjasList = (params) => {
  return request.get('meta/pjas',
  {},
  {
    params
  })
}

// 获取供应商列表
export const pmcsList = (params) => {
  return request.get('meta/pmcs',
  {},
  {
    params
  })
}

// 获取客户列表
export const occsList = (params) => {
  return request.get('meta/occs',
  {},
  {
    params
  })
}

// 获取科目列表
export const aagsList = (params) => {
  return request.get('meta/aags',
  {},
  {
    params
  })
}

// 获取银行列表
export const nmasList = (params) => {
  return request.get('meta/nmas',
  {},
  {
    params
  })
}

// 获取银行异动码列表
export const nmcsList = (params) => {
  return request.get('meta/nmcs',
  {},
  {
    params
  })
}

// 获取WBS列表
export const pjbsList = (params) => {
  return request.get('meta/pjbs',
  {},
  {
    params
  })
}

// 主办人员列表
export const usersList = (params) => {
  return request.get('oa/users',
  {},
  {
    params
  })
}

// 合同类型列表
export const htList = (params) => {
  return request.get('oa/contracttypes',
  {},
  {
    params
  })
}

// 获取模型必填项
export const mustItem = (params) => {
  return request.get('oa/workflows/mustitem',
  {},
  {
    params
  })
}

// 获取发货单详情
export const invoicesInfo = (params) => {
  return request.get(`meta/invoices`,
  {},
  {
    params
  })
}


// 获取当前人员详情 1.23
export const userInfo = (uid) => {
  return request.get(`meta/userinfos?filter[uid]=${uid}`,
  {},
  {})
}

// 获取客户详情 1.30
export const custInfo = (code) => {
  return request.get(`oa/occs/${code}`,
  {},
  {})
}

// 获取gja（业务大类 项目列表） 1.30
export const gjaList = (params) => {
  return request.get(`meta/gjas`,
  {},
  {
    params
  })
}

// 获取供应商详情pmc
export const pmcInfo = (code) => {
  return request.get(`oa/pmcs/${code}`,
  {},
  {})
}

// 获取客户详情occ
export const occInfo = (code) => {
  return request.get(`oa/occs/${code}`,
  {},
  {})
}