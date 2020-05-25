<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="130px"
    class="demo-ruleForm"
  >
    <el-form-item label="对象一级分类" prop="objClass1">
      <el-select v-model="ruleForm.objClass1" placeholder="对象一级分类" @change="changeLevel1" style="width:100%">
        <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="对象二级分类" prop="objClass">
      <el-select v-model="ruleForm.objClass" placeholder="风险二级分类" style="width:100%" :disabled="disabled2">
        <el-option v-for="item in statusOptions2" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="风控对象名称" prop="objName">
      <el-input v-model="ruleForm.objName" placeholder="风控对象名称"></el-input>
    </el-form-item>
    <el-form-item label="风控对象等级" prop="objLevel">
      <el-select v-model="ruleForm.objLevel" placeholder="风控对象等级" style="width:100%">
        <el-option v-for="item in statusOptions3" :key="item.label" :label="item.value" :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="风控对象描述" prop="objDesc">
      <el-input v-model="ruleForm.objDesc"  type="textarea" placeholder="风控对象描述"></el-input>
    </el-form-item>
     <el-form-item label="主管部门" prop="competentDept">
      <el-input v-model="ruleForm.competentDept" placeholder="主管部门"></el-input>
    </el-form-item>
    <el-form-item label="责任人" prop="personLiable">
      <el-input v-model="ruleForm.personLiable" placeholder="责任人"></el-input>
    </el-form-item>
    <el-form-item label="责任单位" prop="respUnit">
      <el-input v-model="ruleForm.respUnit" placeholder="责任单位"></el-input>
    </el-form-item>
    <el-form-item label="风控指标" prop="indexIndicat">
      <el-select v-model="ruleForm.indexIndicat" placeholder="风控指标"  multiple  style="width:100%">
        <el-option v-for="item in statusOptions4" :key="item.id" :label="item.indexZh" :value="item.id">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!view">
      <el-button type="primary" @click="handleSubmit('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="hangleBack()">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {getobjLevel1,getobjLevel2,addobj,getqueryFreq} from "./../../../api/objRiskDiscern/api";
export default {
  data() {
    return {
      ruleForm: {
        objName: "",
        objClass1:'',
        objClass: "",
        objLevel: "",
        objDesc: "",
        competentDept: '',
        personLiable:'',
        respUnit:'',
        indexIndicat:''
      },
      id: '',
      disabled2:true,
      statusOptions: [],
      statusOptions2:[],
      statusOptions3:[{
          value: 'A++',
          label: 'A++'
        },{
          value: 'A+',
          label: 'A+'
        },{
          value: 'A',
          label: 'A'
        },{
          value: 'A-',
          label: 'A-'
        },{
          value: 'A--',
          label: 'A--'
      }],
      statusOptions4:[],
      rules: {
        objName : [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        objClass: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        objClass1: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        objLevel: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        objDesc: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        competentDept: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        personLiable: [
          { required: true, message: "非空", trigger: "change" }
        ],
        respUnit: [
          { required: true, message: "非空", trigger: "blur" },
        ],
        indexIndicat: [
          { required: true, message: "非空", trigger: "blur" },
        ],
      },
      view: ''
    };
  },
  created() {
    this.handleLevel1();
    this.handleQuery();
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
    },
    hangleBack(){
       this.$router.go(-1);//返回上一层
    },
    add(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            objName: this.ruleForm.objName,
            objClass: this.ruleForm.objClass,
            objLevel: this.ruleForm.objLevel,
            objDesc: this.ruleForm.objDesc,
            competentDept: this.ruleForm.competentDept,
            personLiable:this.ruleForm.personLiable,
            respUnit:this.ruleForm.respUnit,
            indexIndicat:this.ruleForm.indexIndicat.join(',')
          }
          addobj(params).then( res => {
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
        getobjLevel1().then(res => {
            this.statusOptions = res.data;
        });
    },
     //获取风险二级分类
    handleLevel2(){
        getobjLevel2({level1:this.ruleForm.objClass1}).then(res => {
            this.statusOptions2 = res.data;
        });
    },
    //获取风险二级分类
    handleQuery(){
        getqueryFreq({}).then(res => {
            this.statusOptions4 = res.data;
        });
    },
    changeLevel1(){
        this.disabled2 = false;
        this.handleLevel2();
    },
  }
};
</script>