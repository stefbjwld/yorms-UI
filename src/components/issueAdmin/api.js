import request from '@/request'

//获取问题列表
export const getList = data => {
    return request ({
        url: `/risk/tQuestionBank/list?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
        method: 'post',
        data: data.params
    })
}

//通过Id获取问题列表
export const getIssueById = data => {
    return request ({
        url: `/risk/tQuestionBank/find?id=${data.id}`,
        method: 'post',
        data: {}
    })
}

//添加问题
export const add = data => {
    return request ({
        url: `/risk/tQuestionBank/add`,
        method: 'post',
        data
    })
}

//更新问题
export const update = data => {
    return request ({
        url: '/risk/tQuestionBank/update',
        method: 'post',
        data
    })
}

//删除问题
export const deleteRow = data => {
    return request ({
        url: `/risk/tQuestionBank/delete?id=${data.id}`,
        method: 'post',
        data
    })
}

