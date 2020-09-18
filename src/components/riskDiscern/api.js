import request from '@/request'

//获取风险列表
export const getList = data => {
    return request ({
        url: `/risk/tRiskLevel/list`,
        method: 'post',
        data: data
    })
}

//通过Id获取风险列表
export const getIssueById = data => {
    return request ({
        url: `/risk/tRiskLevel/find?id=${data.id}`,
        method: 'post',
        data: {}
    })
}

//添加风险
export const add = data => {
    return request ({
        url: `/risk/tRiskLevel/add `,
        method: 'post',
        data
    })
}

//更新风险
export const update = data => {
    return request ({
        url: '/risk/tRiskLevel/update',
        method: 'post',
        data
    })
}

//删除风险
export const deleteRow = data => {
    return request ({
        url: `/risk/tRiskLevel/delete?id=${data.id}`,
        method: 'post',
        data
    })
}

//风险识别接口
export const riskDis = data => {
    return request ({
        url: `/risk/pipette/queryTree`,
        method: 'get',
        data
    })
}
//获取某对象下的指标信息
export const queryKpiValue = data => {
    return request ({
        url: `/risk/pipette/queryKpiValue?objId=${data.objId}&indexAcqFreqId=${data.indexAcqFreqId}`,
        method: 'get',
        data
    })
}