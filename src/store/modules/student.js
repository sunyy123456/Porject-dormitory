import { reqGetStudentList, reqAddStudent,reqDeleteStudent,reqUpdateStudent } from "@/api/student";

const state = {
    studentList: [],
    total: 0,
};
const mutations = {
    GETSTUDENTLIST(state, res){
        state.studentList = res.data;
        state.total = res.length;
    },
};
const actions = {
    // 获取studentList数据
    getStudentList({commit}, page){
        return new Promise((resolve, reject) => {
            reqGetStudentList(page).then((response) => {
                commit('GETSTUDENTLIST', response);
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    },
    // 添加student成员
    addStudent({}, data){
        return new Promise((resolve, reject) => {
            reqAddStudent(data).then(response => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    // 删除student成员
    deleteStudent({commit}, stu){
        return new Promise((resolve, reject) => {
            reqDeleteStudent(stu).then(response => {
                // console.log(response)
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    },
    // 编辑student成员 
    updateStudentById({commit}, stu){
        return new Promise((resolve, reject) => {
            reqUpdateStudent(stu).then(response => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
})
