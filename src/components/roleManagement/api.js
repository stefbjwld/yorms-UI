import request from '@/request'

//查询角色
export const authorityManage = data => {
    return request ({
        url: `/oca/Authority/authorityManage?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'get',
    })
}

//新增角色
export const authorityAdd = data => {
    return request ({
        url: `/oca/Authority/authorityAdd?cookies=''`,
        method: 'post',
        data: data
    })
}

//编辑角色
export const authorityUpdate = data => {
    return request ({
        url: `/oca/Authority/authorityUpdate?cookies=''`,
        method: 'post',
        data: data
    })
}

//删除角色
export const authorityDelete = data => {
    return request ({
        url: `/oca/Authority/authorityDelete?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'post',
        data: data.datas
    })
}


