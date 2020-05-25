import request from '@/request'

//获取风险指标集列表
export const gettarList = data => {
    return request ({
        url: `/IndexAcqFreq/list`,
        method: 'get',
        data: data
    })
}

//添加风险
export const addtar = data => {
    return request ({
        url: `/IndexAcqFreq/add `,
        method: 'post',
        data
    })
}

//更新风险
// export const update = data => {
//     return request ({
//         url: '/tRiskLevel/update',
//         method: 'post',
//         data
//     })
// }

//删除风险
// export const deleteRow = data => {
//     return request ({
//         url: `/tRiskLevel/delete?id=${data.id}`,
//         method: 'post',
//         data
//     })
// }
//
//获取风险一级分类
export const getLevel1 = data => {
    return request ({
        url: `/IndexAcqFreq/level1 `,
        method: 'get',
        data
    })
}
//获取风险二级分类
export const getLevel2 = data => {
    return request ({
        url: `/IndexAcqFreq/level2?level1Id=${data.level1Id} `,
        method: 'get',
        data
    })
}
//获取风险三级分类
export const getLevel3 = data => {
    return request ({
        url: `/IndexAcqFreq/level3?level2Id=${data.level2Id} `,
        method: 'get',
        data
    })
}