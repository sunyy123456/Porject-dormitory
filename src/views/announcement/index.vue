<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item  v-for="(ann,index) in announcement" :key="index" :title="ann.title">
        <div style="background-color: #eee">
          {{ann.content}}
        </div>
      </el-collapse-item>
    </el-collapse>


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
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      announcement: [],
      page: 1,
      total: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$API.announcement.reqGetAnnouncementList(this.page).then((response) => {
        this.announcement = response.data;
        this.total = response.length;
      });
    },
    handleCurrentChange(page){
      this.page = page;
      this.getData();
    }
  },
};
</script>

<style>
</style>
