<template>
  <div>
    <h3 style="margin: 20px 0">发布公告</h3>
    <hr color='#eee'>

    <el-form ref="form" :model="announcement" label-width="60px" :rules="rules">
      <el-form-item label="日期">
          <el-input
          style="width: 600px;"
          disabled
          v-model="announcement.time">
        </el-input>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="announcement.title" style="width: 600px;" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          style="width: 600px;"
          :rows="10"
          placeholder="请输入内容"
          v-model="announcement.content">
        </el-input>
      </el-form-item>
    </el-form>

   <el-button type="success" align='center' style="display: block;margin:0 600px;" @click="submitAnnounce">提交</el-button>

  
  </div>
</template>

<script>
export default {
  name: 'AnnouncementRelease',
  data(){
    return {
      announcement: {
        time: new Date().toISOString().slice(0, 10),
        title: '',
        content: '',
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入公告内容', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    submitAnnounce(){
      this.$refs.form.validate((valid) => {
        if(valid){
          this.$API.announcement.reqAddAnnouncement(this.announcement).then(response => {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.announcement.title = '';
            this.announcement.content = '';
          })
        }
      })
    }
  }
  
}
</script>

<style>
</style>
