<template>
 <div>
    <h3 style="margin: 20px 0">我的问题</h3>
    <hr color='#eee'>

    <el-table :data="problem" border style="width: 100%; margin: 30px 0;">
      <el-table-column prop="time" label="时间" width="width" sortable>
      </el-table-column>
      <el-table-column prop="room" label="宿舍号" width="width">
      </el-table-column>
      <el-table-column prop="content" label="问题内容" width="500px">
      </el-table-column>
      <el-table-column prop="status" label="处理状态" width="width">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="10"
      align="center"
      layout="prev, pager, next, ->, total"
      :total="total"
      style="margin: 10px 0"
    >
    </el-pagination>



    <hr color='#eee'>
  </div>
</template>

<script>
export default {
  name: 'MyProblem',
  data() {
    return {
      problem:[],
      room: '',
      page: 1,
      total: 0,
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    // 获取userInfo，即获取room以发送getProblemList请求
    async getData(){
      try {
        await this.$store.dispatch('user/getUserInfo')
        this.getProblemList();
      } catch (error) {
        alert(error);
      }
    },
    // 获取problem列表
    getProblemList(){
        this.room = this.$store.state.user.userInfo.room;
        let {room, page} = this;
        this.$API.problem.reqGetProblemList(room, page).then(response => {
          this.total = response.length;
          this.problem = response.data;
        }).catch(error => {
          alert(error);
        })
    },
    // 分页器中修改page
    handleCurrentChange(page){
      this.page = page;
      this.getData();
    },
    // 删除problem
    handleDelete(index, row){
      this.$API.problem.reqDeleteProblem(row).then(response => {
        this.getData();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch(error=>{
        alert(error);
      })
    }
  }

}
</script>

<style>
</style>
