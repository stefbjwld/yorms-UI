<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="问题名称" prop="questionName">
      <el-input v-model="ruleForm.questionName" placeholder="问题名称"></el-input>
    </el-form-item>
    <el-form-item label="问题分类" prop="questionType">
      <el-input v-model="ruleForm.questionType" type="number" placeholder="问题分类"></el-input>
    </el-form-item>
    <el-form-item label="问题描述" prop="description">
      <el-input v-model="ruleForm.description" type="textarea" placeholder="问题描述"></el-input>
    </el-form-item>
    <el-form-item label="问题编号" prop="questionNo">
      <el-input v-model="ruleForm.questionNo" placeholder="问题编号"></el-input>
    </el-form-item>
    <el-form-item label="原因分析" prop="causeAnalysis">
      <el-input v-model="ruleForm.causeAnalysis" type="textarea" placeholder="原因分析"></el-input>
    </el-form-item>
    <el-form-item label="发现方式" prop="discoveryMode">
      <el-input v-model="ruleForm.discoveryMode" placeholder="发现方式"></el-input>
    </el-form-item>
    <el-form-item label="整改措施ID" prop="rectificMeasureId">
      <el-input v-model="ruleForm.rectificMeasureId" type="number" placeholder="整改措施ID"></el-input>
    </el-form-item>
    <el-form-item label="整改序号ID" prop="rectificId">
      <el-input v-model="ruleForm.rectificId" placeholder="整改序号ID"></el-input>
    </el-form-item>
    <el-form-item v-if="!view">
      <el-button type="primary" @click="handleSubmit('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { add,getList, getIssueById, update } from './api'
export default {
  data() {
    return {
      options:[],
      ruleForm: {
        questionName: "",
        questionType: "",
        description: "",
        questionNo: '',
        causeAnalysis: '',
        discoveryMode: '',
        rectificMeasureId: '',
        rectificId: '',
      },
      id: '',
      rules: {
        questionName : [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        questionType: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        questionNo: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        causeAnalysis: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        discoveryMode: [
          { required: true, message: "非空", trigger: "change" }
        ],
        rectificMeasureId: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificId: [
          { required: true, message: "非空", trigger: "change" }
        ]
      },
      view: ''
    };
  },
  created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      this.view = this.$route.query.view
      this.handleList()
    }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.questionType = Number(this.ruleForm.questionType)
          this.ruleForm.rectificMeasureId = Number(this.ruleForm.rectificMeasureId)
          add(this.ruleForm).then( res => {
            this.$message.success('添加成功')
            this.$router.go(-1)
          })


          //原生ajax请求
          // let postData = this.ruleForm
          // postData = (function(value){
          //   let oStr = ''
          // 　　for(var key in value){
          // 　　　　oStr += key+"="+value[key]+"&";
          // 　　};
          // 　　return oStr;
          // }(postData)); 
          // var xhr = new XMLHttpRequest();
          // xhr.open('post', 'http://localhost:8080/tRectificMeasure/save' );
          // // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          // // xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
          // //发送请求
          // xhr.send(postData);
          // xhr.onreadystatechange = function () {
          //     // 这步为判断服务器是否正确响应
          //   if (xhr.readyState == 4 && xhr.status == 200) {
          //     console.log(xhr.responseText);
          //   } 
          // };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          update(this.ruleForm).then( res => {
            this.$message.success('修改成功')
            this.$router.go(-1)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleList() {
      let params = Object.assign({id:this.id})
      getIssueById(params).then(res => {
        this.ruleForm = res.data
      });
    }
  }
};
</script>