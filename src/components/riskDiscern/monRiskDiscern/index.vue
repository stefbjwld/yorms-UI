<template>
  <div class="policySystem">
    <h1>风险指标监测</h1>
    <el-divider content-position="right"></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="风险等级">
        <el-input v-model="formInline.levelNo" type="number" placeholder="风险等级"></el-input>
      </el-form-item>
      <el-form-item label="风险等级名称">
        <el-input v-model="formInline.levelName" placeholder="风险等级名称"></el-input>
      </el-form-item>
      <el-form-item label="风险影响">
        <el-input v-model="formInline.riskImpact" placeholder="风险影响"></el-input>
      </el-form-item>
      <el-form-item label="风险编号">
        <el-input v-model="formInline.riskNo" placeholder="风险编号"></el-input>
      </el-form-item>
      <el-form-item label="风险等级状态">
        <el-select v-model="formInline.riskStatus" placeholder="风险等级状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">查询</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加风险</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="levelNo" label="风险等级"></el-table-column>
        <el-table-column prop="levelName" label="风险等级名称"></el-table-column>
        <el-table-column prop="riskImpact" label="风险影响"></el-table-column>
        <el-table-column prop="levelValue" label="风险等级值"></el-table-column>
        <el-table-column prop="riskDescription" label="风险描述"></el-table-column>
        <el-table-column prop="riskNo" label="风险编号"></el-table-column>
        <el-table-column prop="riskStatus" label="风险等级状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delRow(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="viewRow(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination> -->
    </template>
  </div>
</template>

<script>
import { getList, deleteRow } from "./../api";

let id = 1000;
export default {
  name: "issueAdmin",
  data() {
    return {
      options: [],
      formInline: {
        levelNo: "",
        levelName: "",
        riskImpact: "",
        riskNo: "",
        riskStatus: '',
      },
      statusOptions: [
        {
          value: 0,
          label: '激活'
        },
        {
          value: 1,
          label: '新录入'
        },
        {
          value: 2,
          label: '审批'
        },
        {
          value: 3,
          label: '废弃'
        }
      ],
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
      this.$router.push({ path: "/add_risk", query: { id: row.id } });
    },
    delRow(row) {
      deleteRow({id: row.id}).then( res => {
        this.$message.success('删除成功')
        this.handleList()
      })
    },
    viewRow(row) {
      this.$router.push({ path: "/add_risk", query: { id: row.id, view: true } });
    },
    onSubmit() {
      console.log("submit!");
    },
    add() {
      this.$router.push({ path: "/add_risk", query: {} });
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
      // this.formInline.id = this.formInline.rectificId ? this.formInline.id : 0
      // this.formInline.levelNo = this.formInline.levelNo ? this.formInline.levelNo : 0
      getList(this.formInline).then(res => {
        this.tableData = res.data
        // this.total = res.data.total
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
