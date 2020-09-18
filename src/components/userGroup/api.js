import request from '@/request'

//查询用户组
export const groupManage = data => {
    return request ({
        url: `/oca/Group/groupManage?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'get',
    })
}


//新增用户组
export const groupAdd = data => {
    return request ({
        url: `/oca/Group/groupAdd?cookies=''`,
        method: 'post',
        data: data
    })
}



//编辑角色
export const groupUpdate = data => {
    return request ({
        url: `/oca/Group/groupUpdate?cookies=''`,
        method: 'post',
        data: data
    })
}
//删除角色
export const groupDelete = data => {
    return request ({
        url: `/oca/Group/groupDelete?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'post',
        data: data.datas
    })
}

//角色查询
export const queryAll = data => {
    return request ({
        url: `/oca/Authority/queryAll?cookies=''`,
        method: 'get',
    })
}


//角色赋权
export const groupAuthorityManage = data => {
    return request ({
        url: `/oca/Group/groupAuthorityManage?&cookies=''`,
        method: 'post',
        data: data
    })
}


