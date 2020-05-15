<template>
  <div class="policySystem">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="部门名称">
        <el-input v-model="formInline.deptNo" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="制度名称">
        <el-input v-model="formInline.regulationName" placeholder="制度名称"></el-input>
      </el-form-item>
      <el-form-item label="制度文号">
        <el-input v-model="formInline.regulationNo" placeholder="制度文号"></el-input>
      </el-form-item>
      <el-form-item label="发布机构">
        <el-input v-model="formInline.grpId" placeholder="发布机构"></el-input>
      </el-form-item>
      <el-form-item label="制度分类">
        <el-cascader :show-all-levels="false"
          :options="options"
          v-model="formInline.regulationType"
          :props="{ label: 'label', value: 'id' }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">筛选制度</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加制度</el-button>
        <el-button type="warning" @click="goAddRegulationType">添加制度分类</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="regulationName" label="制度名称"></el-table-column>
        <el-table-column prop="regulationNo" label="制度文号"></el-table-column>
        <el-table-column prop="grpId" label="发布机构"></el-table-column>
        <el-table-column prop="regulationType" label="制度分类"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="deptNo" label="部门名称"></el-table-column>
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
import { getListByPage, queryTreeAll, deleteRow } from "./api";

let id = 1000;
export default {
  name: "policySystem",
  data() {
    return {
      options: [],
      formInline: {
        deptNo: "",
        regulationName: "",
        regulationNo: "",
        grpId: "",
        regulationType: [],
        status: ""
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
      currentPage: 1,
      total: null,
      regulationTypeOptions: [],
      activeNames: ['1']
    }
  },
  created() {
    this.handleList();
    this.queryTreeAll();
  },
  methods: {
    editRow(row) {
      this.$router.push({ path: "/add_policy", query: { id: row.id } });
    },
    delRow(row) {
      deleteRow({ids: row.id}).then( res => {
        this.$message.success('删除成功')
        this.handleList()
      })
    },
    viewRow(row) {
      this.$router.push({ path: "/add_policy", query: { id: row.id, view: true } });
    },
    onSubmit() {
      console.log("submit!");
    },
    queryTreeAll() {
      queryTreeAll().then(res => {
        this.options = res.data
        this.regulationTypeOptions = JSON.parse(JSON.stringify(res.data))
      });
    },
    add() {
      this.$router.push({ path: "/add_policy", query: {} });
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
      let len = this.formInline.regulationType.length;
      this.formInline.regulationType = len ? Number(
        this.formInline.regulationType[len - 1]
      ) : 0
      // this.formInline.grpId = Number(this.formInline.grpId);
      // this.formInline.deptNo = undefined
      let params = Object.assign({params:this.formInline}, {pageSize: this.pageSize,pageCount: this.currentPage})
      getListByPage(params).then(res => {
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
