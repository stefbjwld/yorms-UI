import request from '@/request'

//获取风险列表
export const getList = data => {
    return request ({
        url: `/tRiskLevel/list`,
        method: 'post',
        data: data
    })
}

//通过Id获取风险列表
export const getIssueById = data => {
    return request ({
        url: `/tRiskLevel/find?id=${data.id}`,
        method: 'post',
        data: {}
    })
}

//添加风险
export const add = data => {
    return request ({
        url: `/tRiskLevel/add `,
        method: 'post',
        data
    })
}

//更新风险
export const update = data => {
    return request ({
        url: '/tRiskLevel/update',
        method: 'post',
        data
    })
}

//删除风险
export const deleteRow = data => {
    return request ({
        url: `/tRiskLevel/delete?id=${data.id}`,
        method: 'post',
        data
    })
}

