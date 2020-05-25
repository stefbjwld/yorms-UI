import request from '@/request'

//获取风险指标集列表
export const getobjList = data => {
    return request ({
        url: `/pipette/list`,
        method: 'get',
        data: data
    })
}

//添加风险addKpiValus
export const addobj = data => {
    return request ({
        url: `/pipette/add `,
        method: 'post',
        data
    })
}

//获取一级分类
export const getobjLevel1 = data => {
    return request ({
        url: `/pipette/getLevel1`,
        method: 'get',
        data
    })
}
//获取二级分类
export const getobjLevel2 = data => {
    return request ({
        url: `/pipette/getLevel2?level1=${data.level1} `,
        method: 'get',
        data
    })
}
//获取风控指标
export const getqueryFreq = data => {
    return request ({
        url: `/pipette/queryIndexAcqFreq `,
        method: 'get',
        data
    })
}