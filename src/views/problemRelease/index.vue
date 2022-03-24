<template>
  <div>
    <h3 style="margin: 20px 0">发布问题</h3>
    <hr color='#eee'>

    <el-form ref="form" :model="problem" label-width="60px" :rules="rules">
      <el-form-item label="日期">
        <el-input 
          placeholder="请选择日期"
          disabled
          style="width: 600px;"
          v-model="problem.time">
        </el-input>
      </el-form-item>

      <el-form-item label="寝室号">
        <el-input v-model="problem.room" style="width: 600px;" placeholder="请输入寝室号" disabled></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          style="width: 600px;"
          :rows="10"
          placeholder="请输入内容"
          v-model="problem.content">
        </el-input>
      </el-form-item>
    </el-form>

   <el-button type="success" style="display: block;margin:0 600px;" @click="submitProblem">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'ProblemRelease',
  data() {
    return {
      problem:{
        room: this.$store.state.user.userInfo.room,
        time: new Date().toISOString().slice(0, 10),
        content: '',
        status: '未处理',
      },
      rules: {
        content: [
          {required: true, message: '请输入问题', trigger: 'blur'},
        ]
      }
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    async getData(){
      await this.$store.dispatch('user/getUserInfo', this.page);
      this.problem.room = this.$store.state.user.userInfo.room;
    },
    submitProblem(){
      this.$refs.form.validate((valid) => {
        if(valid){
          this.$API.problem.reqAddProblem(this.problem).then(response => {
            // console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.problem.content = '';
          })
        }
      })
    }
  }
}
</script>

<style>
 
</style>
