<template>
  <div class="policySystem">
    <h1>风险问题列表</h1>
    <el-divider content-position="right"></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="问题名称">
        <el-input v-model="formInline.questionName" placeholder="问题名称"></el-input>
      </el-form-item>
      <el-form-item label="问题分类">
        <el-input v-model="formInline.questionType" placeholder="问题分类"></el-input>
      </el-form-item>
      <el-form-item label="问题编号">
        <el-input v-model="formInline.questionNo" placeholder="问题编号"></el-input>
      </el-form-item>
      <el-form-item label="发现方式">
        <el-input v-model="formInline.discoveryMode" placeholder="发现方式"></el-input>
      </el-form-item>
      <el-form-item label="整改措施ID">
        <el-input v-model="formInline.rectificMeasureId" type="number" placeholder="整改措施ID"></el-input>
      </el-form-item>
      <el-form-item label="整改序号ID">
        <el-input v-model="formInline.rectificId" type="number" placeholder="整改序号ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">查询</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加问题</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="questionName" label="问题名称"></el-table-column>
        <el-table-column prop="questionType" label="问题分类"></el-table-column>
        <el-table-column prop="description" label="问题描述"></el-table-column>
        <el-table-column prop="questionNo" label="问题编号"></el-table-column>
        <el-table-column prop="causeAnalysis" label="原因分析"></el-table-column>
        <el-table-column prop="discoveryMode" label="发现方式"></el-table-column>
        <el-table-column prop="rectificMeasureId" label="整改措施ID"></el-table-column>
        <el-table-column prop="rectificId" label="整改序号ID"></el-table-column>
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
import { getList, deleteRow } from "./api";

let id = 1000;
export default {
  name: "issueAdmin",
  data() {
    return {
      options: [],
      formInline: {
        questionName: "",
        questionType: "",
        questionNo: "",
        discoveryMode: "",
        rectificMeasureId: '',
        rectificId: ""
      },
      statusOptions: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "未启用"
        }
      ],
      msg: "政策法规制度",
      tableData: [],
      pageSize: 10,
      currentPage: 0,
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
      deleteRow({id: row.id}).then( res => {
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
      this.$router.push({ path: "/add_issue", query: {} });
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
      this.formInline.questionType = this.formInline.questionType ? this.formInline.questionType : 0
      this.formInline.id = this.formInline.rectificId ? this.formInline.id : 0
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
