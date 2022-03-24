import request from '@/utils/request'

// 提交问题
export const reqAddProblem = (data) => {
    data = JSON.stringify(data);
    return request({
        url: `/addProblem?data=${data}`,
        method: 'post',
    })
}

// 获取问题列表
export const reqGetProblemList = (room, page) => {
    return request({
        url: `/problem/list/${room}/${page}`,
        method: 'get',
    })
}

// 删除问题
export const reqDeleteProblem = (data) => {
    data = JSON.stringify(data);
    return request({
        url: `/deleteProblem?data=${data}`,
        method: 'post',
    })
}

// 根据status获取problem列表
export const reqGetProblemListByStatus = (flag, page) => {
    return request({
        url: `/getProblemList/${flag}/${page}`,
        method: 'post',
    })
}


export const reqUpdateProblemStatus = (data) => {
    data = JSON.stringify(data);
    return request({
        url: `/updateProblemStatus?data=${data}`,
        method: 'post',
    })
}

