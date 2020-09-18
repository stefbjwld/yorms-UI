<template>
    <div class="taskAdmin">
        <h1 class="titleH1">{{ msg }}</h1>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="任务类型">
                <el-select v-model="rectificType" placeholder="请选择任务类型">
                <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-button @click="next" type="primary">下一步</el-button>
    </div>
</template>

<script>
export default {
    name: 'taskAdmin',
    data () {
        return {
            rectificType:'1',
            msg: '创建新任务',
            statusOptions: [{
                value: "1",
                label: "处置整改"
                },{
                value: "2",
                label: "专项检查"
                },{
                value: "3",
                label: "自查"
                },{
                value: "4",
                label: "风险评估"
                }
            ],
        }
    },
    methods:{
        next(){
            this.$router.push({ path: "/rectificationContent", query: {} });
        }
    }
}
</script>

<style scoped>
.titleH1{
    font-size: 16px;
    padding-bottom: 20px
}

</style>
