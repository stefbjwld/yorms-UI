<template>
  <div class="policySystem">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="计划完成时间">
        <el-date-picker
          v-model="formInline.planCompletTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择计划完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="整改配合部门">
        <el-input v-model="formInline.rectificCooperatDept" placeholder="整改配合部门"></el-input>
      </el-form-item>
      <el-form-item label="整改牵头部门ID">
        <el-input v-model="formInline.rectificDeptId" placeholder="整改牵头部门ID"></el-input>
      </el-form-item>
      <el-form-item label="整改牵头部门名称">
        <el-input v-model="formInline.rectificDeptName" placeholder="整改牵头部门名称"></el-input>
      </el-form-item>
      <el-form-item label="整改牵头人">
        <el-input v-model="formInline.rectificLeaderName" placeholder="整改牵头人"></el-input>
      </el-form-item>
      <el-form-item label="整改状态">
        <el-select v-model="formInline.rectificStatus" placeholder="请选择整改状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="整改类型">
        <el-select v-model="formInline.rectificType" placeholder="请选择整改状态">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="整改ID">
        <el-input v-model="formInline.rectificMeasureId" placeholder="整改ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">查询</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加整改措施</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="planCompletTime" label="计划完成时间"></el-table-column>
        <el-table-column prop="rectificCooperatDept" label="整改配合部门"></el-table-column>
        <el-table-column prop="rectificDeptId" label="整改牵头部门ID"></el-table-column>
        <el-table-column prop="rectificDeptName" label="整改牵头部门名称"></el-table-column>
        <el-table-column prop="rectificLeaderName" label="整改牵头人"></el-table-column>
        <el-table-column prop="rectificStatus" label="整改状态"></el-table-column>
        <el-table-column prop="rectificType" label="整改类型"></el-table-column>
        <el-table-column prop="rectificMeasureId" label="整改ID"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delRow(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="viewRow(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import { getList } from "./api";

let id = 1000;
export default {
  name: "issueAdmin",
  data() {
    return {
      options: [],
      formInline: {
        id: 0,
        planCompletTime: "",
        rectificCooperatDept: "",
        rectificDeptId: "",
        rectificDeptName: "",
        rectificLeaderName: '',
        rectificStatus: "",
        rectificType: '',
        rectificMeasureId: '',
      },
      statusOptions: [
        {
          value: "1",
          label: "已整改"
        },
        {
          value: "2",
          label: "未整改"
        },
        {
          value: "3",
          label: "无法整改"
        },
        {
          value: "4",
          label: "整改中"
        }
      ],
      typeOptions: [
        {
          value: "1",
          label: "短期"
        },
        {
          value: "2",
          label: "长期"
        }
      ],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: null,
    }
  },
  created() {
    this.handleList();
  },
  methods: {
    editRow(row) {
      this.$router.push({ path: "/add_issue", query: { id: row.id } });
    },
    delRow(row) {
      deleteRow({ids: row.id}).then( res => {
        this.$message.success('删除成功')
        this.handleList()
      })
    },
    viewRow(row) {
      this.$router.push({ path: "/add_issue", query: { id: row.id, view: true } });
    },
    onSubmit() {
      console.log("submit!");
    },
    add() {
      this.$router.push({ path: "/add_rectific", query: {} });
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleList()
    },
    handleList() {
      this.formInline.rectificDeptId = this.formInline.rectificDeptId ? this.formInline.rectificDeptId : 0
      this.formInline.rectificMeasureId = this.formInline.rectificMeasureId ? this.formInline.rectificMeasureId : 0
      let params = Object.assign({params:this.formInline}, {pageSize: this.pageSize,pageNumber: this.currentPage})
      getList(params).then(res => {
        this.tableData = res.data.pageData
        this.total = res.data.total
      });
    },
    goAddRegulationType() {
      this.$router.push({ path: "/add_regulationType"});
    }
  }
};
</script>

<style scoped>
.regulation-type-box{
  display: flex;
  align-items: center;
}
.regulation-children{
  padding-left: 20px;
}
</style>
