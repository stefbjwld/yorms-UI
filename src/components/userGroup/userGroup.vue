<template>
    <div class="userGroup">
        <div class="addButton">
            <el-button @click="addRole('add')" type="success">新增用户组</el-button>
        </div>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column prop="id" label="ID" width=""></el-table-column>
            <el-table-column prop="groupName" label="用户组名" width=""></el-table-column>
            <el-table-column prop="groupDesc" label="用户组描述" width=""></el-table-column>
            <el-table-column prop="" label="组角色" width=""></el-table-column>
            <el-table-column prop="" label="用户组赋权" width="">
                <template slot-scope="scope">
                    <el-button size="small"  @click="addRole('Empowerment', scope)" type="primary">用户组赋权</el-button>
                </template>
            </el-table-column>
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

        <el-dialog :before-close="closeDialog" :title="flag == 'add' ? '新增' : '编辑'"  width="30%" :visible.sync="dialogFormVisible">
            <el-form ref="formName" :model="dialogForm">
                <el-form-item prop="groupName" :rules="[{ required: true, message: '请输入用户组名', trigger: 'blur' }]" label="用户组名" label-width="120px">
                    <el-input v-model="dialogForm.groupName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="groupDesc" :rules="[{ required: true, message: '请输入角色', trigger: 'blur' }]" label="用户组描述" label-width="120px">
                    <el-input v-model="dialogForm.groupDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="determine()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="'用户组赋权'" width="35%" :visible.sync="dialogVisible">
            <el-form ref="dynamicValidateForm" :model="roleGroup">
                <el-form-item label="用户组名" label-width="120px">
                    <el-input disabled style="width:250px" v-model="roleGroup.groupName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组描述" label-width="120px">
                    <el-input disabled  style="width:250px" v-model="roleGroup.groupDesc" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="roleList" :rules="[{ required: true, message: '请选择角色', trigger: 'blur' }]" label="主角色" label-width="120px">
                    <el-select v-model="roleGroup.roleList" multiple placeholder="请选择">
                        <el-option
                        v-for="item in queryRoleList"
                        :key="item.id"
                        :label="item.authorityDesc"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="groupAuthorityManage()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { groupManage, groupAdd, groupUpdate, groupDelete, queryAll, groupAuthorityManage } from './api'
export default {
    name: 'roleManagement',
    data () {
        return {
            dialogFormVisible: false,
            dialogVisible: false,
            flag: '',
            pagination: {
                pageSize: 5,
                page: 0,
                total: 0
            },
            tableData: [],
            dialogForm: {
                groupName: '',
                authorityDesc: ''
            },
            roleGroup: {
                groupName: '',
                authorityDesc: '',
                id: '',
                roleList: []
            },
            queryRoleList: []
        }
    },
    methods:{
       handleSizeChange(val) {
           this.pagination.pageSize = val;
           this.groupManage();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagination.page = val;
            this.groupManage();
            console.log(`当前页: ${val}`);
        },
        addRole(type, scope){
            this.flag = type;
            switch (type) {
                case 'del':
                    this.dialogForm = {
                        groupName: scope.row.groupName,
                        groupDesc: scope.row.groupDesc,
                        id: scope.row.id
                    }
                    this.groupDelete()
                    break;
                case 'add':
                    this.dialogForm = {
                        groupName: '',
                        groupDesc: '',
                        id: ''
                    }
                    this.dialogFormVisible = true;
                    break;
                case 'edit':
                    this.dialogForm = {
                        groupName: scope.row.groupName,
                        groupDesc: scope.row.groupDesc,
                        id: scope.row.id
                    }
                    this.dialogFormVisible = true;
                    break;
                case 'Empowerment':
                    this.roleGroup = {
                        groupName: scope.row.groupName,
                        groupDesc: scope.row.groupDesc,
                        id: scope.row.id,
                        roleList: []
                    }
                    this.queryAll()
                    this.dialogVisible = true;
                    break; 
            }
        },
        // 关闭Dialog
        closeDialog() {
            if(this.$refs['formName']) {
                this.$refs['formName'].resetFields();
                this.dialogFormVisible = false;
            }
            if(this.$refs['dynamicValidateForm']) {
                this.$refs['dynamicValidateForm'].resetFields();
                this.dialogVisible = false;
            }
            
        },
        determine(){
            this.$refs['formName'].validate((valid) => {
                if (valid) {
                   switch (this.flag) {
                        case 'add':
                            this.groupAdd()
                            break;
                        default:
                            this.groupUpdate()
                            break;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        groupDelete() {
            groupDelete({pageSize: this.pagination.pageSize, page: this.pagination.page, datas: this.dialogForm}).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.groupManage();
                } else {
                    this.$message.error(res.message);
                }
                
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        groupUpdate() {
            groupUpdate(this.dialogForm).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.groupManage();
                } else {
                    this.$message.error(res.message);
                }
                
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        //角色赋权
        groupAuthorityManage() {
            this.$refs['dynamicValidateForm'].validate((valid) => {
                if (valid) {
                    groupAuthorityManage({authorityIds: this.roleGroup.roleList, groupId: this.roleGroup.id}).then((res) => {
                        if (res.status == 200) {
                            this.$message({
                                message: '赋权成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.groupManage();
                        } else {
                            this.$message.error(res.message);
                        }
                        
                    }).catch((err) => {
                        this.$message.error(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        groupAdd() {
            groupAdd(this.dialogForm).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.groupManage();
                } else {
                    this.$message.error(res.message);
                }
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        groupManage() {
            groupManage({pageSize: this.pagination.pageSize, page: this.pagination.page}).then((res) => {
                this.pagination.total = res.data.totalElements
                this.tableData = res.data.content
            })
        },
        queryAll() {
            queryAll({pageSize: this.pagination.pageSize, page: this.pagination.page}).then((res) => {
                this.queryRoleList = res.data
            })
        }
    },
    mounted(){
        this.groupManage()
    }
}
</script>

<style scoped>
    .addButton{
        margin-bottom: 15px;
    }
</style>
