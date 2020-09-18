<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="风险一级分类" prop="level1">
      <el-select v-model="ruleForm.level1" placeholder="风险一级分类" style="width:100%"  @change="changeLevel1">
        <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="风险二级分类" prop="level2">
      <el-select v-model="ruleForm.level2" placeholder="风险二级分类" style="width:100%"  :disabled="disabled2" @change="changeLevel2">
        <el-option v-for="item in statusOptions2" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="风险三级分类" prop="level3">
      <el-select v-model="ruleForm.level3" :disabled="disabled3" placeholder="风险三级分类" style="width:100%" >
        <el-option v-for="item in statusOptions3" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="指标中文" prop="indexZh">
      <el-input v-model="ruleForm.indexZh" placeholder="指标中文"></el-input>
    </el-form-item>
    <el-form-item label="指标英文" prop="indexEn">
      <el-input v-model="ruleForm.indexEn" placeholder="指标英文"></el-input>
    </el-form-item>
    <el-form-item label="指标编号" prop="indexNo">
      <el-input v-model="ruleForm.indexNo"  placeholder="指标编号"></el-input>
    </el-form-item>
    <el-form-item label="采集频率" prop="indexAcqFreq">
      <el-input v-model="ruleForm.indexAcqFreq" placeholder="采集频率"></el-input>
    </el-form-item>
     <el-form-item label="指标单位" prop="indexUnit">
      <el-input v-model="ruleForm.indexUnit" placeholder="指标单位"></el-input>
    </el-form-item>
    <el-form-item label="指标描述" prop="indexDesc">
      <el-input v-model="ruleForm.indexDesc" type="textarea" placeholder="指标描述"></el-input>
    </el-form-item>
    <el-form-item v-if="!view">
      <el-button type="primary" @click="handleSubmit('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="hangleBack()">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import { add,getList, update } from './api'
import {getLevel1,getLevel2,getLevel3,addtar } from "./../../../api/tarRiskDiscern/api";
export default {
  data() {
    return {
      ruleForm: {
        level1: "",
        level2: "",
        level3: "",
        indexZh: "",
        indexEn: '',
        indexNo:'',
        indexAcqFreq:'',
        indexUnit:'',
        indexDesc:''
      },
      id: '',
      statusOptions: [],
      statusOptions2:[],
      statusOptions3:[],
      disabled2:true ,
      disabled3:true,
      rules: {
        level1 : [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        level2: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        level3: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexZh: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexEn: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexNo: [
          { required: true, message: "非空", trigger: "change" }
        ],
        indexAcqFreq: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexUnit: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexDesc: [
          { required: true, message: "非空", trigger: "blur" },
        ],
      },
      view: ''
    };
  },
  created() {
    this.handleLevel1();
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.id){
            this.add()
          } else if(this.id && !this.view){
            this.update()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.disabled2 = true;
      this.disabled3 = true;
    },
    hangleBack(){
       this.$router.go(-1);//返回上一层
    },
    add(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            riskClassifiId: this.ruleForm.level3,
            indexZh: this.ruleForm.indexZh,
            indexEn: this.ruleForm.indexEn,
            indexNo:this.ruleForm.indexNo,
            indexAcqFreq:this.ruleForm.indexAcqFreq,
            indexUnit:this.ruleForm.indexUnit,
            indexDesc:this.ruleForm.indexDesc
          }
          addtar(params).then( res => {
            this.$message.success('添加成功')
            this.$router.go(-1)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // update() {
    //   this.$refs.ruleForm.validate(valid => {
    //     if (valid) {
    //       this.ruleForm.levelNo = Number(this.ruleForm.levelNo)
    //       update(this.ruleForm).then( res => {
    //         this.$message.success('修改成功')
    //         this.$router.go(-1)
    //       })
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
   
    //获取风险一级分类
    handleLevel1(){
        getLevel1().then(res => {
            this.statusOptions = res.data;
        });
    },
    //获取风险二级分类
    handleLevel2(){
        getLevel2({level1Id:this.ruleForm.level1}).then(res => {
            this.statusOptions2 = res.data;
        });
    },
    //获取风险三级分类
    handleLevel3(){
        getLevel3({level2Id:this.ruleForm.level2}).then(res => {
            this.statusOptions3 = res.data;
        });
    },
    changeLevel1(){
      if(this.ruleForm.level1 != ''){
        this.disabled2 = false;
        this.handleLevel2();
      }
    },
    changeLevel2(){
      if(this.ruleForm.level1 != ''&&this.ruleForm.level2 != ''){
        this.disabled3 = false;
        this.handleLevel3();
      }
        
    }
  }
};
</script>