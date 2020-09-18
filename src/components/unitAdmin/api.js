import request from '@/request'

//查询组织机构树
export const organizationTreeIncludeDepartment = data => {
    return request ({
        url: `/oca/Organization/organizationTreeIncludeDepartment`,
        method: 'get',
    })
}
//查询节点信息
export const organizationGenealogyPath = data => {
    return request ({
        url: `/oca/Organization/organizationGenealogyPath?cookies=''&id=${data}`,
        method: 'get',
    })
}
//查询节点修改的信息
export const getNodeById = data => {
    return request ({
        url: `/oca/Organization/getNodeById?cookies=''&id=${data}`,
        method: 'get',
    })
}
//新增
export const nodeAdd = data => {
    return request ({
        url: `/oca/Organization/nodeAdd?cookies=''&parentId=${data.id}`,
        method: 'post',
        data: data.data
    })
}
//删除
export const nodeDel  = data => {
    return request ({
        url: `/oca/Organization/nodeDel?cookies=''&id=${data}`,
        method: 'post',
    })
}
//修改
export const nodeUpdate   = data => {
    return request ({
        url: `/oca/Organization/nodeUpdate?cookies=''`,
        method: 'post',
        data: data
    })
}