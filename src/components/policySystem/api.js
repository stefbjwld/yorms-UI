import request from '@/request'

//查询政策制度
export const getListByPage = data => {
    return request ({
        url: `/regulatPolic/queryByOptionPage?pageSize=${data.pageSize}&pageCount=${data.pageCount}`,
        method: 'post',
        data: data.params
    })
}

//查询政策制度
export const getList = data => {
    return request ({
        url: `/regulatPolic/queryByOption`,
        method: 'post',
        data
    })
}

//添加政策制度
export const add = data => {
    return request ({
        url: '/regulatPolic/add',
        method: 'post',
        data
    })
}

//更新政策制度
export const update = data => {
    return request ({
        url: '/regulatPolic/update ',
        method: 'post',
        data
    })
}

//删除政策制度
export const deleteRow = data => {
    return request ({
        url: `/regulatPolic/del?ids=${data.ids}`,
        method: 'post',
        data
    })
}

//查询所有政策制度分类
export const queryTreeAll = params => {
    return request ({
        url: '/regulationType/queryTreeAll',
        method: 'get',
        params
    })
}

//添加政策制度分类
export const addRegulationType = data => {
    return request ({
        url: '/regulationType/add',
        method: 'post',
        data
    })
}