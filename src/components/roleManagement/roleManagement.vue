<template>
    <div class="roleManagement">
        <h1>角色管理</h1>
        <el-divider content-position="right"></el-divider>
        <div class="addButton">
            <el-button @click="addRole('add')" type="success">新增角色</el-button>
        </div>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column prop="id" label="ID" width=""></el-table-column>
            <el-table-column prop="authorityName" label="角色名" width=""></el-table-column>
            <el-table-column prop="authorityDesc" label="角色描述" width=""></el-table-column>
            <el-table-column  prop="" label="操作">
                <template slot-scope="scope">
                    <el-button size="small"  @click="addRole('edit', scope)" type="primary">编辑</el-button>
                    <el-button size="small"  @click="addRole('del', scope)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div align="right">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
            </el-pagination>
        </div>
        <el-dialog :before-close="closeDialog" width="30%" :title="flag == 'add' ? '新增' : '编辑'" :visible.sync="dialogFormVisible">
            <el-form  ref="formName" :model="dialogForm">
                <el-form-item  prop="authorityName" :rules="[{ required: true, message: '请输入角色名', trigger: 'blur' }]" label="角色名" label-width="120px">
                    <el-input v-model="dialogForm.authorityName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="authorityDesc" :rules="[{ required: true, message: '请输入角色描述', trigger: 'blur' }]" label="角色描述" label-width="120px">
                    <el-input v-model="dialogForm.authorityDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="determine()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { authorityManage, authorityAdd, authorityUpdate, authorityDelete } from './api'
export default {
    name: 'roleManagement',
    data () {
        return {
            dialogFormVisible: false,
            flag: '',
            pagination: {
                pageSize: 5,
                page: 0,
                total: 0
            },
            tableData: [],
            dialogForm: {
                authorityName: '',
                authorityDesc: ''
            }
        }
    },
    methods:{
       handleSizeChange(val) {
           this.pagination.pageSize = val;
           this.authorityManage();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagination.page = val;
            this.authorityManage();
            console.log(`当前页: ${val}`);
        },
        addRole(type, scope){
            this.flag = type;
            switch (type) {
                case 'del':
                    this.dialogForm = {
                        authorityName: scope.row.authorityName,
                        authorityDesc: scope.row.authorityDesc,
                        id: scope.row.id
                    }
                    this.authorityDelete()
                    break;
                case 'add':
                    this.dialogForm = {
                        authorityName: '',
                        authorityDesc: '',
                        id: ''
                    }
                    this.dialogFormVisible = true;
                    break;
                case 'edit':
                    console.log(scope.row)
                    this.dialogForm = {
                        authorityName: scope.row.authorityName,
                        authorityDesc: scope.row.authorityDesc,
                        id: scope.row.id
                    }
                    this.dialogFormVisible = true;
                    break;    
            }
        },
        closeDialog(){
            this.$refs['formName'].resetFields();
            this.dialogFormVisible = false;
        },
        determine(){
            this.$refs['formName'].validate((valid) => {
                if (valid) {
                    switch (this.flag) {
                        case 'add':
                            this.authorityAdd()
                            break;
                        default:
                            this.authorityUpdate()
                            break;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        authorityDelete() {
            authorityDelete({pageSize: this.pagination.pageSize, page: this.pagination.page, datas: this.dialogForm}).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.authorityManage();
                } else {
                    this.$message.error(res.message);
                }
                
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        authorityUpdate() {
            authorityUpdate(this.dialogForm).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.authorityManage();
                } else {
                    this.$message.error(res.message);
                }
                
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        authorityAdd() {
            authorityAdd(this.dialogForm).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.authorityManage();
                } else {
                    this.$message.error(res.message);
                }
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        authorityManage() {
            authorityManage({pageSize: this.pagination.pageSize, page: this.pagination.page}).then((res) => {
                this.pagination.total = res.data.totalElements
                this.tableData = res.data.content
            })
        }
    },
    mounted(){
        this.authorityManage()
    }
}
</script>

<style scoped>
    .addButton{
        margin-bottom: 15px;
    }
</style>
