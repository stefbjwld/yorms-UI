<template>
    <div class="mains">
        <div class="header">
            <h1>运维风险管理平台</h1>
            <span @click="signOut"><i class="el-icon-s-check"></i>&nbsp;admin&nbsp;&nbsp;&nbsp;退出</span>
        </div>
        <div class="content_wrap">
            <div class="cont_l">
                <ul>
                    <li v-for="(i,index) in navList" :key="index" @click="cutContent(index)" :class="{ active:index == listActive }">
                        <router-link :to="i.url"><span>{{ i.title }}</span></router-link>
                    </li>
                </ul>
            </div>
            <div class="cont_r">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mains',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            navList : [
                {title:'风险管理总视图',url:'/main/'},
                {title:'风险识别',url:'/riskDiscern'},
                {title:'问题管理',url:'/issueAdmin'},
                {title:'整改措施',url:'/rectificAdmin'},
                {title:'处置与整改任务管理',url:'/taskAdmin'},
                {title:'政策法规制度',url:'/policySystemlist'},
                {title:'组织机构管理',url:'/unitAdmin'},
                {title:'权限管理',url:'/authorityAdmin'}
            ],
            listActive : 0
        }
    },
    created() {
        console.log(this,888)
        this.handleList();
    },
    mounted(){
        // 解决刷新后左侧导航索引对不上的问题
        let initActive = localStorage.getItem('active');
        if( initActive != null ){
            this.listActive = initActive;
        }
    },
    methods:{
        cutContent( index ){
            this.listActive = index;
            localStorage.setItem( 'active',index );
        },
        signOut(){
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 60px;
    background: #000;
    position: relative;
    z-index: 99;
    position: fixed;
    color: rgb(157,157,157);
}
.header h1{
    font-size: 16px;
    line-height: 60px;
    padding-left: 30px;
    font-weight: 600;
    float: left;
}
.header span{
    float: right;
    font-size: 16px;
    line-height: 60px;
    padding-right: 30px;
    cursor: pointer;
}
.content_wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.cont_l{
    width: 250px;
    z-index: 10;
    background: #000;
    position: fixed;
    bottom: 0px;
    top:0px;
}
.cont_l ul{
    margin-top: 60px;
}
.cont_l li{
    width: 100%;
}
.cont_l li a{
    line-height: 50px;
    font-size: 14px;
    display: block;
    color: #f5f5f5;
    text-indent: 30px;
    background: #000;
}
.cont_l li a:hover{
    color: #fff;
    background: rgb(0,21,40);
}
.cont_l li.active a{
    color: #409EFF;
    /* background: #409EFF; */
}
.cont_r{
    margin-left:250px;
    padding: 30px 0 30px 30px;
    margin-top: 60px;
}

</style>
