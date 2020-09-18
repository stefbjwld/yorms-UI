<template>
    <div class="">
        <el-tabs type="border-card">
            <el-tab-pane label="组织机构管理">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-table
                            :data="tableData1"
                            style="width: 100%"
                            row-key="id"
                            border
                            @cell-click="cellClick"
                            :tree-props="{children: 'nodes', hasChildren: 'hasChildren'}">
                            <el-table-column prop="text" label="组织机构树"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="never">
                            <div slot="header" class="clearfix">
                                <span style="font-size:14px;font-weight: bold">操作菜单</span>
                            </div>
                            <div class="text item">
                                <div>选中节点:{{name}}</div>
                                <div style="margin-top:15px">
                                    <el-button @click="operation('add')" type="success">新增</el-button>
                                    <el-button @click="operation('del')" type="danger">删除</el-button>
                                    <el-button @click="operation('modify')" type="primary">修改</el-button>
                                </div>
                                <div style="margin-top:15px">
                                    <el-form ref="form"  :model="form" label-width="100px">
                                        <el-form-item label="组织机构名称">
                                            <el-input :disabled="isdisabled" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="组织结构描述">
                                            <el-input :disabled="isdisabled" v-model="form.orgDesc"></el-input>
                                        </el-form-item>
                                        <el-form-item label="组织机构代码">
                                            <el-input :disabled="isdisabled" v-model="form.organization_code"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否部门">
                                            <el-radio-group :disabled="isdisabled" v-model="form.department">
                                                <el-radio :label="true">是</el-radio>
                                                <el-radio :label="false">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item v-if="!isdisabled">
                                            <el-button type="primary" @click="onSubmit">确定</el-button>
                                            <el-button>取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
import { organizationTreeIncludeDepartment, organizationGenealogyPath, nodeAdd, nodeDel, getNodeById, nodeUpdate } from './api'
export default {
    name: 'unitAdmin',
    data () {
        return {
            isdisabled: true,
            msg: '组织机构管理',
            tableData1: [],
            name:'',
            information: {
                nodeId: '',
                type: '',
            },
            form: {
                id: '',
                name:'',
                orgDesc:'',
                organization_code: '',
                department:false
            }
        }
    },
    methods:{
        operation(type) {
            this.information.type = type;
            switch (type) {
                case 'add':
                    this.isdisabled = false;
                    this.form = {
                        id: '',
                        name:'',
                        orgDesc:'',
                        organization_code: '',
                        department:false
                    }
                    break;
                case 'del':
                    this.form = {
                        id: '',
                        name:'',
                        orgDesc:'',
                        organization_code: '',
                        department:false
                    }
                    this.nodeDel()
                    break;
                default:
                    this.isdisabled = false;
                    break;
            }
        },
        onSubmit() {
            switch (this.information.type) {
                case 'add':
                    
                    this.nodeAdd(this.form)
                    break;
                default:
                    this.nodeUpdate()
                    break;
            }
        },
        cellClick(row, column, cell){
            this.isdisabled = true;
            this.information.nodeId = row.id;
            this.getNodeById(row.id);
            this.organizationGenealogyPath(row);
        },
        nodeDel() {
            nodeDel(this.information.nodeId).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.organizationTreeIncludeDepartment()
                }
            })
        },
        nodeAdd(data) {
            nodeAdd({data, id:this.information.nodeId}).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.isdisabled = true;
                    this.getNodeById(this.information.nodeId);
                    this.organizationTreeIncludeDepartment()
                }
            })
        },
        nodeUpdate() {
            this.form.id = this.information.nodeId
            nodeUpdate(this.form).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.isdisabled = true;
                    this.getNodeById(this.information.nodeId);
                    this.organizationTreeIncludeDepartment()
                }
            })
        },
        getNodeById(id) {
            getNodeById(id).then((res) => {
                this.form = {
                    name:res.data.name,
                    orgDesc:res.data.orgDesc,
                    organization_code: res.data.organization_code,
                    department:res.data.department
                }
            })
        },
        organizationGenealogyPath(row) {
            this.name = ''
            organizationGenealogyPath(row.id).then((res) => {
                let nameList = res
                for (const iterator of nameList.data) {
                    this.name += `/${iterator.name}`
                }
            })
        },
        organizationTreeIncludeDepartment() {
            organizationTreeIncludeDepartment().then((res) => {
                this.tableData1 = res.data
            })
        }
    },
    mounted() {
        this.organizationTreeIncludeDepartment()
    }
}
</script>

<style scoped>
    /deep/ .el-card__header{
        padding: 12px;
        color:#606266;
    }
</style>
