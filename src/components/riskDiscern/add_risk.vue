<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="风险等级" prop="levelNo">
      <el-input v-model="ruleForm.levelNo" type="number" placeholder="风险等级"></el-input>
    </el-form-item>
    <el-form-item label="风险等级名称" prop="levelName">
      <el-input v-model="ruleForm.levelName" placeholder="风险等级名称"></el-input>
    </el-form-item>
    <el-form-item label="风险影响" prop="riskImpact">
      <el-input v-model="ruleForm.riskImpact" type="textarea" placeholder="风险影响"></el-input>
    </el-form-item>
    <el-form-item label="风险等级值" prop="levelValue" v-if="id">
      <el-input v-model="ruleForm.levelValue" placeholder="风险等级值"></el-input>
    </el-form-item>
    <el-form-item label="风险描述" prop="riskDescription" v-if="id">
      <el-input v-model="ruleForm.riskDescription" type="textarea" placeholder="风险描述"></el-input>
    </el-form-item>
    <el-form-item label="风险编号" prop="riskNo">
      <el-input v-model="ruleForm.riskNo" placeholder="风险编号"></el-input>
    </el-form-item>
    <el-form-item label="风险等级状态" prop="riskStatus" v-if="id">
      <el-select v-model="ruleForm.riskStatus" placeholder="风险等级状态">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
        levelNo: "",
        levelName: "",
        riskImpact: "",
        levelValue: '',
        riskDescription: '',
        riskNo: '',
        riskStatus: '',
      },
      id: '',
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
      rules: {
        levelNo : [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        levelName: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        riskImpact: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        levelValue: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        riskDescription: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        riskNo: [
          { required: true, message: "非空", trigger: "change" }
        ],
        riskStatus: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
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
          this.ruleForm.levelNo = Number(this.ruleForm.levelNo)
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
          this.ruleForm.levelNo = Number(this.ruleForm.levelNo)
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