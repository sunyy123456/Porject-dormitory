<template>
  <div>
    <h3 style="float: left; margin: 20px 0">成员信息</h3>
    <el-button type="primary" round style="float: right; margin: 20px 0" @click="showAddDialog"
      >添加成员</el-button
    >

    <!-- data是要显示的数据，是数组类型的 -->
    <!-- 整体的表格 -->
    <el-table :data="studentList" border style="width: 100%; margin: 30px 0">
      <el-table-column
        prop="room"
        label="宿舍号"
        align="center"
        sortable
        width="width"
      >
      </el-table-column>

      <el-table-column
        prop="stuNo"
        label="学号"
        sortable
        align="center"
        width="width"
      >
      </el-table-column>

      <el-table-column prop="name" label="姓名" align="center" width="width">
      </el-table-column>

      <el-table-column prop="college" label="学院" align="center" width="400px">
      </el-table-column>

      <el-table-column label="操作" align="center" width="width">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
            
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加成员" :visible.sync="addDialogFormVisible" width="40%" >
        <el-form :model="updateStudent" :rules="rulesAdd" ref="ruleAddForm">
          <el-form-item label="寝室号" label-width="100px" prop="room">
            <el-input v-model="updateStudent.room" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学号"  label-width="100px" prop="stuNo">
            <el-input v-model="updateStudent.stuNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="updateStudent.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院"  label-width="100px" prop="college">
            <el-input v-model="updateStudent.college" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStudent"
            >确 定</el-button
          >
        </div>
    </el-dialog>


    <el-dialog title="编辑成员" :visible.sync="editDialogFormVisible" width="40%" >
        <el-form :model="editStudent" :rules="rulesEdit" ref="ruleEditForm">
          <el-form-item label="寝室号" label-width="100px" prop="room">
            <el-input v-model="editStudent.room" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学号"  label-width="100px" prop="stuNo">
            <el-input v-model="editStudent.stuNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="editStudent.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院"  label-width="100px" prop="college">
            <el-input v-model="editStudent.college" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false;">取 消</el-button>
          <el-button type="primary" @click="updateStudentById"
            >确 定</el-button
          >
        </div>
    </el-dialog>

    <!-- 分页器 -->
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

    <!-- 分割线 -->
    <hr color="#eee" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MemberManage",
  mounted(){
    // 发请求获取数据
    this.getData(this.page);
  },
  computed:{
    ...mapState('student', ['studentList', 'total']),
  },
  data() {
    return {
      addDialogFormVisible: false,
      editDialogFormVisible:false,
      updateStudent: {
        room: '',
        stuNo: '',
        name: '',
        college: '',
      },
      editStudent: {
        room: '',
        stuNo: '',
        name: '',
        college: '',
      },
      page: 1,
      // 添加成员的表单验证规则
      rulesAdd: {
        name: [
          { required: true, message: '请输入成员姓名', trigger: 'blur' },
        ],
        room: [
          { required: true, message: '请输入寝室号', trigger: 'blur' },
        ],
        stuNo: [
          { required: true, message: '请输入学号', trigger: 'blur' },
        ],
        college: [
          { required: true, message: '请输入学院', trigger: 'blur' },
        ],
      },
      // 编辑成员的表单验证规则
      rulesEdit: {
        name: [
          { required: true, message: '请输入成员姓名', trigger: 'blur' },
        ],
        room: [
          { required: true, message: '请输入寝室号', trigger: 'blur' },
        ],
        stuNo: [
          { required: true, message: '请输入学号', trigger: 'blur' },
        ],
        college: [
          { required: true, message: '请输入学院', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 获取studentList数据
    getData(page){
        this.$store.dispatch('student/getStudentList', page);
    },
    // 点击编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.editDialogFormVisible = true;
      this.editStudent = {...row};
    },
    // 删除成员
    async handleDelete(index, row) {
      // console.log(index, row);
      try {
        await this.$store.dispatch('student/deleteStudent', row)
        // messgage消息提示
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getData(this.page);
      } catch (error) {
        alert(error);
      }
    },
    // 分页器中修改当前页
    handleCurrentChange(page) {
      this.page = page;
      this.getData(page);
    },
    // 展示添加的dialog
    showAddDialog(){
      this.addDialogFormVisible = true;
    },
    // 展示编辑的dialog
    showEditDialog(){
      this.editDialogFormVisible = true;
    },
    // 添加成员
    addStudent(){
      this.addDialogFormVisible = false;
      this.$refs.ruleAddForm.validate(async(valid) => {
        if(valid){
          try {
            await this.$store.dispatch('student/addStudent', this.updateStudent);
            await this.getData(this.page);
              this.$message({
                message: '添加成功',
                type: 'success'
            });
            this.updateStudent = {};
          } catch (error) {
            alert(error);
          }
        }else{
          alert('请输入完整信息！！');
        }
      })

    },
    // 编辑成员
    updateStudentById(){
      this.editDialogFormVisible = false;
      this.$refs.ruleEditForm.validate(async (valid) => {
        if(valid){
          try {
            await this.$store.dispatch('student/updateStudentById', this.editStudent);
            this.getData(this.page);
            this.$message({
              message: '编辑成功',
              type: 'success'
            });
          } catch (error) {
            alert(error);
          }
        }else{
          alert('请输入完整的信息！');
        }
      })
    }
  },
};
</script>

<style>
</style>
