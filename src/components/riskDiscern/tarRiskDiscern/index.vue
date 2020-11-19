<template>
  <div class="policySystem">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="风险一级分类">
        <el-select v-model="formInline.level1" placeholder="风险一级分类" @change="changeLevel1">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风险二级分类">
        <el-select v-model="formInline.level2" placeholder="风险二级分类" :disabled="disabled2"  @change="changeLevel2">
          <el-option v-for="item in statusOptions2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风险三级分类">
        <el-select v-model="formInline.level3" placeholder="风险三级分类" :disabled="disabled3">
          <el-option v-for="item in statusOptions3" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指标中文">
        <el-input v-model="formInline.indexZh" placeholder="指标中文"></el-input>
      </el-form-item>
      <el-form-item label="指标英文">
        <el-input v-model="formInline.indexEn" placeholder="指标英文"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleList">查询</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="add">添加风险</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="level1" label="风险一级分类"></el-table-column>
        <el-table-column prop="level2" label="风险二级分类"></el-table-column>
        <el-table-column prop="level3" label="风险三级分类"></el-table-column>
        <el-table-column prop="indexZh" label="指标中文"></el-table-column>
        <el-table-column prop="indexEn" label="指标英文"></el-table-column>
        <el-table-column prop="indexNo" label="指标编号"></el-table-column>
        <el-table-column prop="indexAcqFreq" label="采集频率"></el-table-column>
        <el-table-column prop="indexUnit" label="指标单位"></el-table-column>
        <el-table-column prop="indexDesc" label="指标描述"></el-table-column>
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
import { gettarList, getLevel1,getLevel2,getLevel3 } from "./../../../api/tarRiskDiscern/api";

let id = 1000;
export default {
  name: "issueAdmin",
  data() {
    return {
      formInline: {
        level1: "",
        level2: "",
        level3: "",
        indexZh: "",
        indexEn: '',
      },
      statusOptions: [],
      statusOptions2:[],
      statusOptions3:[],
      tableData: [],
      disabled2:true ,
      disabled3:true,
    //   pageSize: 10,
    //   currentPage: 0,
    //   total: null,
    }
  },
  created() {
    this.handleList();
    this.handleLevel1();
  },
  methods: {
    editRow(row) {
    //   this.$router.push({ path: "/add_risk", query: { id: row.id } });
    },
    delRow(row) {
    //   deleteRow({id: row.id}).then( res => {
    //     this.$message.success('删除成功')
    //     this.handleList()
    //   })
    },
    viewRow(row) {
    //   this.$router.push({ path: "/add_risk", query: { id: row.id, view: true } });
    },
   
    add() {
      this.$router.push({ path: "/taradd", query: {} });
    },
    // handleSizeChange(val) {
    //   this.pageSize = val
    //   this.handleList()
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val
    //   this.handleList()
    // },
    //获取列表
    handleList() {
      gettarList(this.formInline).then(res => {
        this.tableData = res.data
      });
    },
    //获取风险一级分类
    handleLevel1(){
        getLevel1().then(res => {
            this.statusOptions = res.data;
        });
    },
     //获取风险二级分类
    handleLevel2(){
        // let params = Object.assign({id:this.formInline.level1})
        getLevel2({level1Id:this.formInline.level1}).then(res => {
            this.statusOptions2 = res.data;
        });
    },
     //获取风险三级分类
    handleLevel3(){
        getLevel3({level2Id:this.formInline.level2}).then(res => {
            this.statusOptions3 = res.data;
        });
    },
    changeLevel1(){
        this.disabled2 = false;
        this.handleLevel2();
    },
     changeLevel2(){
        this.disabled3 = false;
        this.handleLevel3();
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
.resbutton{
  margin-left: 0;
}
</style>
