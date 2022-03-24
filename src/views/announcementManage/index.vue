<template>
  <div>
    <h3 style="margin: 20px 0">公告管理</h3>
    <hr color='#eee'>

    <el-table :data="announcement" border style="width: 100%; margin: 30px 0;">
      <el-table-column prop="time" label="时间" width="width" sortable>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="width">
      </el-table-column>
      <el-table-column prop="content" label="内容" width="500px">
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
  name: 'AnnouncementManage',
  data() {
    return {
      announcement:[],
      page:1,
      total:0,
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
      handleDelete(index, row) {
        // console.log(index, row);
        this.$API.announcement.reqDeleteAnnouncement(row).then(response => {
          this.getData();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).catch(error => {
          alert(error);
        })
      },
      handleCurrentChange(page){
        this.page = page;
        this.getData();
      },
      getData(){
        this.$API.announcement.reqGetAnnouncementList(this.page).then(response => {
          this.announcement = response.data;
          this.total = response.length;
        }).catch(error => {
          alert(error);
        })
      }
    }
}
</script>

<style>
</style>
