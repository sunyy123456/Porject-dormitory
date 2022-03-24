import request from '@/utils/request'

// 获取成员信息
export function reqGetStudentList(page){
    return request({
        url: `/student/list/${page}`,
        method: 'get'
    })
} 

// 添加成员
export function reqAddStudent(data){
    data = JSON.stringify(data);
    return request({
        url: `/addStudent?data=${data}`,
        method: 'post'
    })
} 

// 删除成员
export function reqDeleteStudent(data){
    data = JSON.stringify(data);
    return request({
        url: `/deleteStudent?data=${data}`,
        method: 'post'
    })
} 

// 更新成员
export function reqUpdateStudent(data){
    data = JSON.stringify(data);
    return request({
        url: `/updateStudent?data=${data}`,
        method: 'post'
    })
} 

