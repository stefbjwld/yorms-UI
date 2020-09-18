<template>

  <div>
    <div>
      <h1>{{ msg }}</h1>
      <el-divider content-position="right"></el-divider>
    </div>
    <div class="taskAdmin">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="任务编号">
          <el-input v-model="input" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="input" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="处置问题">
          <el-select style="width:190px" v-model="rectificType" placeholder="请选择任务类型">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="风险编号">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="风险指标">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="一级分类">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="二级分类">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="三级分类">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="风险等级">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="风险值">
          <el-input v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="问题详情">
          <el-input style="width:450px" type="textarea" v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="任务开始结束日期">
          <el-date-picker style="width:395px" v-model="input" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="任务描述">
          <el-input style="width:450px" type="textarea" v-model="input" placeholder=""></el-input>
        </el-form-item>
        <br>
        <el-form-item label="附件">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
            :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button @click="save" type="primary">保存</el-button>
      <el-button type="primary">保存并提交</el-button>
      <el-button type="primary">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'taskAdmin',
    data() {
      return {
        rectificType: '1',
        msg: '处置整改任务内容',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        statusOptions: [{
          value: "1",
          label: "弹出问题选择框"
        }],
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      save() {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }
    }
  }

</script>

<style scoped>
  .titleH1 {
    font-size: 16px;
    padding-bottom: 20px
  }

  /* .taskAdmin .el-form-item{
    width: 35%;
    float: left;
}
.taskAdmin .el-input {
    width: 100%
  } */
  .taskAdmin {
    padding: 15px;
    box-shadow: 0px 0px 5px #888888;
  }

</style>
