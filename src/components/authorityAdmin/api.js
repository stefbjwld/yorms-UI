import request from '@/request'

//查询用户
export const userManage = data => {
    return request ({
        url: `/oca/User/userManage?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'get',
    })
}
//删除用户
export const userDelete = data => {
    return request ({
        url: `/oca/User/userDelete?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'post',
        data: data.data
    })
}

//查详情
export const queryUserById = data => {
    return request ({
        url: `/oca/User/queryUserById?userId=${data}&cookies=''`,
        method: 'get',
    })
}

//更新
export const userUpdate = data => {
    return request ({
        url: `/oca/User/userUpdate?pageSize=${data.pageSize}&page=${data.page}&cookies=''`,
        method: 'post',
        data: data.data
    })
}


//新增
export const userAdd = data => {
    console.log(data)
    return request ({
        url: `/oca/User/userAdd?cookies=''`,
        method: 'post',
        data: data
    })
}

//查单位
export const organizationTreeExcludeDepartment = data => {
    return request ({
        url: `/oca/Organization/organizationTreeExcludeDepartment?cookies=''`,
        method: 'get',
    })
}

//查部门
export const getChildDepartment = data => {
    return request ({
        url: `/oca/Organization/getChildDepartment?cookies=''&id=${data}`,
        method: 'get',
    })
}


//筛选
export const userFilter = data => {
    return request ({
        url: `/oca/User/userFilter?orgId=${data.orgId}&dptId=${data.dptId}&groupId=${data.groupId}&roleId=${data.roleId}&locked=${data.locked}&pageSize=${data.pageSize}&page=${data.page}`,
        method: 'get',
    })
}



//查询用户组
export const userQueryAll = data => {
    return request ({
        url: `/oca/Group/queryAll`,
        method: 'get',
    })
}

//查询角色列表
export const AuthorityQueryAll = data => {
    return request ({
        url: `/oca/Authority/queryAll`,
        method: 'get',
    })
}
