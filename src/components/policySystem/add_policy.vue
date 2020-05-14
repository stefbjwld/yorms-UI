<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="部门名称" prop="deptNo">
      <el-input v-model="ruleForm.deptNo"></el-input>
    </el-form-item>
    <el-form-item label="制度分类" prop="regulationType">
      <el-cascader :options="options" v-model="ruleForm.regulationType" :props="{ label: 'label', value: 'id' }" clearable></el-cascader>
    </el-form-item>
    <el-form-item label="制度名称" prop="regulationName">
      <el-input v-model="ruleForm.regulationName"></el-input>
    </el-form-item>
    <el-form-item label="发文号" prop="regulationNo">
      <el-input v-model="ruleForm.regulationNo"></el-input>
    </el-form-item>
    <el-form-item label="发布机构ID" prop="grpId">
      <el-input type="number" v-model="ruleForm.grpId"></el-input>
    </el-form-item>
    <el-form-item label="启用状态" prop="status">
      <el-select v-model="ruleForm.status" placeholder="请选择">
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
import { queryTreeAll, add, getList, update } from './api'
export default {
  data() {
    return {
      options:[],
      ruleForm: {
        regulationName: "",
        regulationNo: "",
        grpId: "",
        regulationType: [],
        deptNo: '',
        status: '',
        id: ''
      },
      statusOptions: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '未启用'
        },
      ],
      rules: {
        deptNo : [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        status: [
          { required: true, message: "非空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        regulationName: [
          { required: true, message: "请输入制度名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        regulationNo: [
          { required: true, message: "请输入发文号", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        grpId: [
          { required: true, message: "请输入发布机构", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        regulationType: [
          { required: true, message: "请选择制度分类", trigger: "change" }
        ]
      },
      view: ''
    };
  },
  created() {
    if(this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      this.view = this.$route.query.view
      this.handleList()
    }
    this.queryTreeAll()
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.ruleForm.id){
            this.add()
          } else if(this.ruleForm.id && !this.view){
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
    queryTreeAll() {
      queryTreeAll().then( res => {
        this.options = res.data
      })
    },
    add() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let len = this.ruleForm.regulationType.length
          this.ruleForm.regulationType = Number(this.ruleForm.regulationType[len-1])
          this.ruleForm.grpId = Number(this.ruleForm.grpId)
          add(this.ruleForm).then( res => {
            this.$message.success('添加成功')
            this.$router.go(-1)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.grpId = Number(this.ruleForm.grpId)
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
      let len = this.ruleForm.regulationType.length;
      this.ruleForm.regulationType = len ? Number(
        this.ruleForm.regulationType[len - 1]
      ) : 0
      let params = Object.assign({params:this.ruleForm})
      getList(params).then(res => {
        this.ruleForm = res.data[0]
      });
    }
  }
};
</script>