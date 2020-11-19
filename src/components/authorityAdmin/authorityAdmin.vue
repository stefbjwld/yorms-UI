<template>
    <div class="authorityAdmin">
        <el-form :inline="true" :model="serchData" class="demo-form-inline">
        <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="用户组">
                         <el-select clearable  v-model="serchData.userName" placeholder="请选择">
                            <el-option
                            v-for="item in querySelectList.userQueryAllList"
                            :key="item.id"
                            :label="item.groupDesc"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="角色">
                         <el-select clearable  v-model="serchData.AuthorityName" placeholder="请选择">
                            <el-option
                            v-for="item in querySelectList.AuthorityQueryAll"
                            :key="item.id"
                            :label="item.authorityDesc"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="启用状态">
                         <el-select clearable  v-model="serchData.locked" placeholder="请选择">
                            <el-option label="启用" :value="true"></el-option>
                            <el-option label="未启用" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位">
                         <el-popover
                            placement="bottom"
                            width="200"
                            @hide="hidePopover($event, 'serch')"
                            trigger="click">
                            <div>
                                <el-tree :data="list.orgList" :props="{children: 'nodes',label: 'text'}" @node-click="handleNodeClick($event, 'serch')"></el-tree>
                            </div>
                            <el-input slot="reference" clearable @clear="clearInput" @focus="onOrg" v-model="serchData.orgName" autocomplete="off"></el-input>
                        </el-popover>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门">
                         <el-select clearable  v-model="serchData.dptId" placeholder="请选择">
                            <el-option
                            v-for="item in list.dptList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                
            
        </el-row>
        <el-row>
            <el-col :span="8">
                    <el-form-item>
                        <el-button type="primary" @click="userFilter()" icon="el-icon-search">筛选用户</el-button>
                        <el-button type="primary"  @click="userAdd('add')" icon="el-icon-circle-plus">新增用户</el-button>
                    </el-form-item>
                </el-col>
        </el-row>
        </el-form>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column prop="id" label="ID" width=""></el-table-column>
            <el-table-column prop="userName" label="用户名" width=""></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="userDesc" label="用户描述" width=""></el-table-column>
            <el-table-column prop="locked" label="是否启用" width="">
                <template  slot-scope="scope">
                    <div>
                        {{scope.row.locked ? '启用' : '未启用'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="orgName" label="单位" width=""></el-table-column>
            <el-table-column prop="dptName" label="部门" width=""></el-table-column>
            <el-table-column prop="groups" label="用户组" width=""></el-table-column>
            <el-table-column prop="authorities" label="角色"></el-table-column>
            <el-table-column  prop="" label="操作"  width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="userAdd('edit', scope)" type="primary">编辑</el-button>
                    <el-button size="small" @click="userAdd('del', scope)" type="danger">删除</el-button>
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

        <el-dialog :title="flag == 'add' ? '新增' : '编辑'" width="30%" :before-close="beforeClose" :visible.sync="dialogFormVisible">
            <el-form ref="ruleForm" :model="dialogForm"  class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]" label-width="120px">
                    <el-input v-model="dialogForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="isEdit" label="密码" show-password prop="password" :rules="[{ validator: validatePass, trigger: 'blur' }]" label-width="120px">
                    <el-input v-model="dialogForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="isEdit" label="确认密码" show-password  prop="checkPass" :rules="[{ validator: validatePass2, trigger: 'blur' }]" label-width="120px">
                    <el-input v-model="dialogForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="orgName" :rules="[{ required: true, message: '请选择单位', trigger: 'blur' }]" label-width="120px">
                    <el-popover
                        placement="bottom"
                        width="200"
                        v-model="popover"
                        @hide="hidePopover($event, 'dialog')"
                        trigger="click">
                        <div>
                            <el-tree :data="list.orgList" :props="{children: 'nodes',label: 'text'}" @node-click="handleNodeClick($event, 'dialog')"></el-tree>
                        </div>
                        <el-input slot="reference" readonly @focus="onOrg" v-model="dialogForm.orgName" autocomplete="off"></el-input>
                    </el-popover>
                    
                </el-form-item>
                <el-form-item prop="dptId" :rules="[{ required: true, message: '请选择部门', trigger: 'blur' }]" label="部门" label-width="120px">
                    <el-select v-model="dialogForm.dptId" placeholder="请选择">
                        <el-option
                        v-for="item in list.dptList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="userDesc" :rules="[{ required: true, message: '请输入用户描述', trigger: 'blur' }]" label="用户描述" label-width="120px">
                    <el-input v-model="dialogForm.userDesc" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" label-width="120px">
                    <el-radio-group v-model="dialogForm.locked">
                        <el-radio :label="true">启用</el-radio>
                        <el-radio :label="false">未启用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="beforeClose()">取 消</el-button>
                <el-button type="primary" @click="determine()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { queryAll, userManage, userDelete, queryUserById, userUpdate, organizationTreeExcludeDepartment, getChildDepartment, userAdd, userQueryAll, AuthorityQueryAll, userFilter } from './api'
        
export default {
    name: 'authorityAdmin',
    data () {
        return {
            flag: '',
            dialogFormVisible: false,
            isEdit: false,
            popover:false,
            serchData: {
                locked: '',
                orgId:'',
                orgName: '',
                dptId: '',
                AuthorityName: '',
                userName:''
            },
            querySelectList: {
                userQueryAllList: [],
                AuthorityQueryAll: []
            },
            pagination: {
                pageSize: 5,
                page: 0,
                total: 0
            },
            tableData: [],
            dialogForm: {},
            list: {
                orgList: [],
                dptList: []
            },
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            if (this.serchData.locked == '' && this.serchData.orgId == '' && this.serchData.dptId == '' && this.serchData.AuthorityName == '' && this.serchData.userName == '') {
                this.userManage();
            } else {
                this.userFilter()
            }
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagination.page = val;
            if (this.serchData.locked == '' && this.serchData.orgId == '' && this.serchData.dptId == '' && this.serchData.AuthorityName == '' && this.serchData.userName == '') {
                this.userManage()
            } else {
                this.userFilter()
            }
            console.log(`当前页: ${val}`);
        },
        beforeClose(){
            this.$refs['ruleForm'].resetFields();
            this.dialogFormVisible = false;
        },
        validatePass(rule, value, callback) {
            console.log(454545)
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.dialogForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        },
        validatePass2(rule, value, callback) {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.dialogForm.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        },
        determine(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    switch (this.flag) {
                        case 'add':
                            this.userAddApi()
                            break;
                        default:
                            this.userUpdate()
                            break;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        userAdd(type, scope) {
            this.flag = type;
            this.dialogFormVisible = true;
            switch (type) {
                case 'edit':
                    this.isEdit = false;
                    this.queryUserById(scope.row, type)
                    break;
                case 'del':
                    this.dialogFormVisible = false;
                    this.queryUserById(scope.row, type)
                    break;
                default:
                    this.dialogForm = {
                        userName: '',
                        password: '',
                        checkPass: '',
                        orgName: '',
                        dptName: '',
                        userDesc: '',
                        locked: false,
                        dptId: '',
                        orgId: ''
                    }
                    this.isEdit = true;
                    break;
            }
        },
        // 选择单位的回调
        handleNodeClick(data, type) {
            console.log(data, type)
            switch (type) {
                case 'serch':
                    this.serchData.orgId = data.id;
                    this.serchData.orgName = data.text;
                    break;
                default:
                    this.dialogForm.orgId = data.id;
                    this.dialogForm.orgName = data.text;
                    break;
            }
            
        },
        // 关闭Popover的回调（单位选择完毕）
        hidePopover(data, type){
            switch (type) {
                case 'serch':
                    if(this.serchData.orgId == '') return;
                    this.serchData.dptId = '';
                    this.getChildDepartment(this.serchData.orgId);
                    break;
                default:
                    if(this.dialogForm.orgId == '') return;
                    this.dialogForm.dptId = '';
                    this.getChildDepartment(this.dialogForm.orgId);
                    break;
            }
        },
        clearInput(){
            this.serchData.orgId = '';
            this.serchData.dptId = '';
            this.list.dptList = [];
        },
        onOrg(){
            this.organizationTreeExcludeDepartment()
        },
        queryUserById(row, type) {
            queryUserById(row.id).then((res) => {
                if (res.status == 200) {
                    if (type == 'del') {
                        this.userDelete(res.data)
                        return
                    }
                    this.organizationTreeExcludeDepartment();
                    this.getChildDepartment(res.data.orgId);
                    window.setTimeout(() => {
                        this.dialogForm = res.data;
                        this.dialogForm.orgName = row.orgName;
                    }, 200)
                    
                    // this.dialogForm.dptName = row.dptName;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 查表格
        userManage() {
            userManage({pageSize: this.pagination.pageSize, page: this.pagination.page}).then((res) => {
                this.pagination.total = res.data.totalElements
                this.tableData = res.data.content
            })
        },
        userFilter() {
            userFilter({ orgId: this.serchData.orgId, dptId: this.serchData.dptId, groupId: this.serchData.userName, roleId: this.serchData.AuthorityName, locked: this.serchData.locked, pageSize: this.pagination.pageSize, page: this.pagination.page}).then((res) => {
                this.pagination.total = res.data.totalElements
                this.tableData = res.data.content
            })
        },
        // 查单位
        organizationTreeExcludeDepartment() {
            organizationTreeExcludeDepartment().then((res) => {
                if (res.status == 200) {
                    this.list.orgList = res.data
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 查部门
        getChildDepartment(id) {
            getChildDepartment(id).then((res) => {
                if (res.status == 200) {
                    this.list.dptList = res.data
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 查询用户组
        userQueryAll() {
            userQueryAll().then((res) => {
                if (res.status == 200) {
                    this.querySelectList.userQueryAllList = res.data
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 查询角色列表
        AuthorityQueryAll() {
            AuthorityQueryAll().then((res) => {
                if (res.status == 200) {
                    this.querySelectList.AuthorityQueryAll = res.data
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 删除
        userDelete(scope) {
            userDelete({pageSize: this.pagination.pageSize, page: this.pagination.page, data: scope}).then((res) => {
                if (res.status == 200) {
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.userManage()
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 更新
        userUpdate() {
            userUpdate({pageSize: this.pagination.pageSize, page: this.pagination.page, data: this.dialogForm}).then((res) => {
                if (res.status == 200) {
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.userManage()
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 新增
        userAddApi() {
            console.log(this.dialogForm)
            userAdd(this.dialogForm).then((res) => {
                if (res.status == 200) {
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.userManage()
                } else {
                    this.$message.error(res.message);
                }
            })
        }
    },
    mounted() {
        this.userManage();
        this.userQueryAll();
        this.AuthorityQueryAll()
    }
}
</script>

<style scoped>
    .user{
        font-size: 15px;
        font-weight: bold;
    }

</style>
