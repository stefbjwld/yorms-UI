import request from '@/request'

//获取整改措施列表
export const getList = data => {
    return request ({
        url: `/risk/tRectificMeasure/list?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
        method: 'post',
        data: data.params
    })
}

//添加整改措施
export const add = data => {
    return request ({
        url: `/risk/tRectificMeasure/add`,
        method: 'post',
        data
    })
}

//更新整改措施
export const update = data => {
    return request ({
        url: '/risk/tRectificMeasure/update',
        method: 'post',
        data
    })
}

//删除整改措施
export const deleteRow = data => {
    return request ({
        url: `/risk/regulatPolic/del?ids=${data.ids}`,
        method: 'post',
        data
    })
}

//获取单条数据
export const getObjById = data => {
    return request ({
        url: `/risk/tRectificMeasure/find?id=${id}`,
        method: 'post',
        data
    })
}