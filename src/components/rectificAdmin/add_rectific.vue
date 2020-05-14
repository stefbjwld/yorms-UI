<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="140px"
    class="demo-ruleForm"
  >
    <el-form-item label="计划完成时间" prop="planCompletTime">
      <el-date-picker
        v-model="ruleForm.planCompletTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择计划完成时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="整改配合部门"  prop="rectificCooperatDept">
      <el-input v-model="ruleForm.rectificCooperatDept" placeholder="整改配合部门"></el-input>
    </el-form-item>
    <el-form-item label="整改牵头部门ID"  prop="rectificDeptId">
      <el-input v-model="ruleForm.rectificDeptId" placeholder="整改牵头部门ID"></el-input>
    </el-form-item>
    <el-form-item label="整改牵头部门名称"  prop="rectificDeptName">
      <el-input v-model="ruleForm.rectificDeptName" placeholder="整改牵头部门名称"></el-input>
    </el-form-item>
    <el-form-item label="整改牵头人" prop="rectificLeaderName">
      <el-input v-model="ruleForm.rectificLeaderName" placeholder="整改牵头人"></el-input>
    </el-form-item>
    <el-form-item label="整改状态" prop="rectificStatus">
      <el-select v-model="ruleForm.rectificStatus" placeholder="请选择整改状态">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="整改类型" prop="rectificType">
      <el-select v-model="ruleForm.rectificType" placeholder="请选择整改状态">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="整改ID" prop="rectificMeasureId">
      <el-input v-model="ruleForm.rectificMeasureId" placeholder="整改ID"></el-input>
    </el-form-item>
    <el-form-item v-if="!view">
      <el-button type="primary" @click="handleSubmit('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { add, getObjById, update } from "./api";
export default {
  data() {
    return {
      options: [],
      ruleForm: {
        planCompletTime: "",
        rectificCooperatDept: "",
        rectificDeptId: "",
        rectificDeptName: "",
        rectificLeaderName: "",
        rectificStatus: "",
        rectificType: "",
        rectificMeasureId: "",
        
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
      rules: {
        planCompletTime: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificCooperatDept: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificDeptId: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificDeptName: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificLeaderName: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificStatus: [
          { required: true, message: "非空", trigger: "change" }
        ],
        rectificType: [
          { required: true, message: "非空", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rectificMeasureId: [
          { required: true, message: "非空", trigger: "change" }
        ]
      },
      view: ""
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      // this.ruleForm.id = this.$route.query.id;
      this.view = this.$route.query.view;
      this.handleList();
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.add();
          } else if (this.id && !this.view) {
            this.update();
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
          this.ruleForm.rectificDeptId = Number(this.ruleForm.rectificDeptId);
          this.ruleForm.rectificMeasureId = Number(this.ruleForm.rectificMeasureId);
          add(this.ruleForm).then(res => {
            this.$message.success("添加成功");
            this.$router.go(-1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.grpId = Number(this.ruleForm.grpId);
          update(this.ruleForm).then(res => {
            this.$message.success("修改成功");
            this.$router.go(-1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleList() {
      let len = this.ruleForm.regulationType.length;
      this.ruleForm.regulationType = len
        ? Number(this.ruleForm.regulationType[len - 1])
        : 0;
      let params = Object.assign({ params: this.ruleForm });
      getList(params).then(res => {
        this.ruleForm = res.data[0];
      });
    }
  }
};
</script>