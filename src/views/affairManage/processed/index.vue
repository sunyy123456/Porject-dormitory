<template>
  <div>
    <h3 style="margin: 20px 0">已处理事务</h3>
    <hr color='#eee'>

    <el-table :data="affair" border style="width: 100%; margin: 30px 0;">
      <el-table-column prop="time" label="时间" width="width" sortable>
      </el-table-column>
      <el-table-column prop="room" label="宿舍号" width="width">
      </el-table-column>
      <el-table-column prop="content" label="问题" width="400px">
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
  name: "Processed",
  data() {
    return {
      affair:[],
      page: 1,
      total: 0,
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    handleDelete(index, row) {
      // console.log(index, row);
      this.$API.problem.reqDeleteProblem(row).then(response => {
        this.getData();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch(error => {
        alert(error);
      })
    },
    getData(){
      let page = this.page;
      let flag = 1;
      this.$API.problem.reqGetProblemListByStatus(flag, page).then(response => {
        this.affair = response.data;
        this.total = response.length;
      }).catch(error => {
        alert(error);
      })
    },
    handleCurrentChange(page){
      this.page = page;
      this.getData();
    }
  }
};
</script>

<style>
</style>
