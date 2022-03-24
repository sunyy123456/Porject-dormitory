<template>
  <div>
    <h3 style="margin: 20px 0">未处理事务</h3>
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >处理完成</el-button
          >
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
  name: 'Unprocessed',
  data() {
    return {
      affair:[],
      total:0,
      page:1,
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        this.$API.problem.reqUpdateProblemStatus(row).then(response => {
          this.getData();
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }).catch(error => {
          alert(error);
        })
      },
      // 删除事务/问题
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
        let flag = 0;
        let page = this.page;
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
}
</script>

<style>
</style>
