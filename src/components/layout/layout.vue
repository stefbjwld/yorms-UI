<template>
  <div class="content_wrap">
    <div class="cont_l">
      <ul>
        <li
          v-for="(i, index) in navList"
          :key="index"
          @click="cutContent(index)"
          :class="{ active: index == listActive }"
        >
          <router-link :to="i.url">
            <span>
              <i :class="i.icon"></i>
              {{ i.title }}
            </span>
          </router-link>
          <ul class="cont_lul" v-if="index === display && status == index">
            <li
              v-for="(item, indexm) in i.titleUl"
              :key="indexm"
              @click="cutContentm(index, indexm)"
              :class="state == indexm ? 'active-tag' : 'active-t'"
            >
              <router-link :to="item.url">
                <span>
                  <i :class="item.icon"></i>
                  {{ item.titleLi }}
                </span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="cont_r">
      <div class="header">
        <h1>运维风险管理平台</h1>
        <span @click="signOut" class="span1">
          <svg-icon icon-class="people" />
          <i></i>&nbsp;admin&nbsp;&nbsp;&nbsp;退出
        </span>
      </div>
      <div class="tagview">
        <tags-view></tags-view>
      </div>
      <div class="workarea">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain.vue";

export default {
  name: "main",
  components: {
    TagsView,
    AppMain,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      navList: [
        {
          title: "风险首页",
          url: "/dashboard",
          icon: "el-icon-s-home icon1",
        },
        {
          title: "风险识别",
          url: "/riskDiscern",
          icon: "el-icon-menu icon1",
          titleUl: [
            {
              titleLi: "风险管控对象管理",
              url: "/obj_riskDiscern",
              icon: "icon2",
            },
            {
              titleLi: "风险指标集",
              url: "/tar_riskDiscern",
              icon: "icon2",
            },
            {
              titleLi: "风险指标监测",
              url: "/mon_riskDiscern",
              icon: "icon2",
            },
          ],
        },
        {
          title: "问题管理",
          url: "/issueAdmin",
          icon: "el-icon-warning icon1",
        },
        {
          title: "任务管理",
          url: "/taskAdmin",
          icon: "el-icon-tickets icon1",
          titleUl: [
            {
              titleLi: "整改措施",
              url: "/rectificAdmin",
              icon: "icon2",
            },
          ],
        },
        {
          title: "系统管理",
          url: "",
          icon: "el-icon-setting icon1",
          titleUl: [
            {
              titleLi: "组织机构管理",
              url: "/unitAdmin",
              icon: "icon2",
            },
            {
              titleLi: "用户管理",
              url: "/authorityAdmin",
              icon: "icon2",
            },
            {
              titleLi: "用户组管理",
              url: "/userGroup",
              icon: "icon2",
            },
            {
              titleLi: "角色管理",
              url: "/roleManagement",
              icon: "icon2",
            },
          ],
        },
        { title: "工作台", url: "", icon: "el-icon-menu icon1" },
        {
          title: "风险制度法规",
          url: "/policySystemlist",
          icon: "el-icon-menu icon1",
        },
      ],
      listActive: 0,
      isNav: false,
      display: null,
      status: null,
      state: null,
    };
  },
  created() {
    console.log(this, 888);
    // this.handleList();
  },
  mounted() {
    // 解决刷新后左侧导航索引对不上的问题
    let initActive = localStorage.getItem("active");
    if (initActive != null) {
      this.listActive = initActive;
    }
  },
  methods: {
    cutContent(index) {
      this.listActive = index;
      localStorage.setItem("active", index);
      this.display = index;
      if (this.status !== index) {
        this.status = index;
      } else {
        this.status = null;
      }
    },
    signOut() {
      this.$router.push("/");
    },
    cutContentm(index, indexm) {
      this.display = index;
      if (this.status !== index) {
        this.status = index;
      } else {
        this.status = null;
      }
      this.state = indexm;
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
  },
};
</script>

<style scoped>
.cont_l {
  width: 200px;
  z-index: 10;
  background: rgb(60, 60, 60);
  position: fixed;
  bottom: 0px;
  top: 0px;
  box-shadow: 2px 2px 5px #888888;
}
.cont_l ul {
  margin-top: 0px;
  overflow: hidden;
}
.cont_l li {
  width: 100%;
}
.cont_l li a {
  line-height: 50px;
  font-size: 14px;
  display: block;
  color: #f5f5f5;
  text-indent: 30px;
  background: rgb(60, 60, 60);
}
.cont_l li a:hover {
  color: #fff;
  background: rgb(90, 90, 90);
}
.cont_l li.active a {
  color: #409eff;
  /* background: #409EFF; */
}
.cont_l .cont_lul {
  margin-top: 0;
  margin-left: 0px;
}

.cont_lul li span {
  padding-left: 15px;
}
.cont_lul li.active-tag a:hover {
  color: #fff;
  background: rgb(90, 90, 90);
}
.cont_lul li.active-tag a {
  color: #409eff;
}
.cont_lul li.active-t a {
  color: #f5f5f5;
}

.cont_r {
  margin-left: 200px;
  height: 100vh;
  overflow: hidden;
}

.header {
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 2px 2px #f0efef;
  position: relative;
  color: rgb(94, 93, 93);
}
.header h1 {
  font-size: 20px;
  line-height: 60px;
  padding-left: 10px;
  font-weight: 600;
  float: left;
}
.span1 {
  float: right;
  font-size: 16px;
  line-height: 60px;
  padding-right: 30px;
  cursor: pointer;
}
.span2 {
  float: left;
  font-size: 36px;
  line-height: 60px;
  padding-left: 20px;
  cursor: pointer;
}
.icon1 {
  margin-left: -30px;
  padding-right: 10px;
}
.icon2{
  margin-left: 20px;
}

.tagview {
  margin-top: 0px;
}

.workarea {
  padding: 10px 20px 10px 20px;
  height: inherit;
  overflow: auto;
  background-color: rgb(240, 242, 245);
}
</style>
