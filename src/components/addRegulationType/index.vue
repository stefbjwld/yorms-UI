<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="item in regulationTypeOptions" :key="item.value">
        <template slot="title">
          {{item.label}}
          <span @click="showDialog(item.value)" style="color:#409EFF;margin-left:10px;">添加子级分类</span>
        </template>
        <div class="regulation-children" v-if="item.children && item.children.length">
          <div v-for="ele in item.children" :key="ele.value">{{ele.label}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="请输入下一级"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRegulationType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryTreeAll, addRegulationType } from "../policySystem/api";
export default {
  data() {
    return {
      regulationTypeOptions: [],
      activeNames: ['1'],
      dialogVisible: false,
      input: '',
      typeTreeCode: ''
    };
  },
  created() {
    this.queryTreeAll()
  },
  methods: {
    queryTreeAll() {
      queryTreeAll().then(res => {
        this.regulationTypeOptions = JSON.parse(JSON.stringify(res.data))
      });
    },
    showDialog(val) {
        this.dialogVisible = true
        this.typeTreeCode = val
    },
    append(data) {
    //   const newChild = { id: id++, label: "testtest", children: [] };
    //   if (!data.children) {
    //     this.$set(data, "children", []);
    //   }
    //   data.children.push(newChild);
      console.log(data);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleChange() {},
    handleClose() {
      this.typeTreeCode = ''
      this.input = ''
      this.dialogVisible = false
    },
    addRegulationType() {
        let data = {
            typeName: this.input,
            typeTreeCode: this.typeTreeCode
        }
        addRegulationType(data).then( res => {
            // console.log(res);
            this.handleClose()
        })
    },
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
</style>
