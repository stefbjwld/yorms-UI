<template>
  <div class="policySystem">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="风控对象名称">
        <el-input v-model="formInline.objName" placeholder="风控对象名称"></el-input>
      </el-form-item>
      <el-form-item label="风控对象等级">
        <el-input v-model="formInline.objLevel" placeholder="风控对象等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">查询</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加风控</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="objName" label="风控对象名称"></el-table-column>
        <el-table-column prop="objClassName" label="风控对象分类"></el-table-column>
        <el-table-column prop="objLevel" label="风控对象等级"></el-table-column>
        <el-table-column prop="objDesc" label="风控对象描述"></el-table-column>
        <el-table-column prop="indexIndicatNames" label="风控指标"></el-table-column>
        <el-table-column prop="competentDept" label="主管部门"></el-table-column>
        <el-table-column prop="personLiable" label="责任人"></el-table-column>
        <el-table-column prop="respUnit" label="责任单位"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delRow(scope.row)" type="text" size="small">删除</el-button>
            <el-button class="resbutton" @click="viewRow(scope.row)" type="text" size="small">查看</el-button>
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
  import {
    getobjList
  } from "./../../../api/objRiskDiscern/api";

  let id = 1000;
  export default {
    name: "issueAdmin",
    data() {
      return {
        formInline: {
          objName: "",
          objLevel: "",
        },
        statusOptions: [],
        statusOptions2: [],
        statusOptions3: [],
        tableData: [],
        disabled2: true,
        disabled3: true,
        //   pageSize: 10,
        //   currentPage: 0,
        //   total: null,
      }
    },
    created() {
      this.handleList();
    },
    methods: {
      editRow(row) {},
      delRow(row) {},
      viewRow(row) {},
      add() {
        this.$router.push({
          path: "/objadd",
          query: {}
        });
      },
      //获取列表
      handleList() {
        getobjList(this.formInline).then(res => {
          this.tableData = res.data
        });
      }
    }
  };

</script>

<style scoped>
  .regulation-type-box {
    display: flex;
    align-items: center;
  }

  .regulation-children {
    padding-left: 20px;
  }

  .resbutton {
    margin-left: 0;
  }

</style>
