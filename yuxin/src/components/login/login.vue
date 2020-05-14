<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-form">
        <p class="login-form-title">创新平台公测版</p>
        <p class="login-form-text">1.0</p>
        <el-form
            :model="loginForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="" prop="username">
            <el-input
                type="text"
                suffix-icon="el-icon-date"
                v-model="loginForm.username"
                placeholder="请输入用户名"
            ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
            <el-input
                :type="inputType"
                suffix-icon="el-icon-lock"
                class="input password"
                v-model="loginForm.password"
                placeholder="请输入密码"
            ></el-input>
            </el-form-item>
            <el-form-item>
            <el-button :loading="loading" type="button" class="button login-btn" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
        <!-- <div class="form-input">
          <el-input
            type="text"
            suffix-icon="el-icon-date"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
          <el-input
            :type="inputType"
            suffix-icon="el-icon-lock"
            class="input password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
          
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      inputType: "password",
      loading: false,
      rules: {
          username: [
            { required: true, message: '非空', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '非空', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
      }
    };
  },
  // beforeRouteEnter (to, from, next) {
  //     next(vm => {
  //     })
  // },
  // beforeRouteLeave(to, from, next) {
  //     next();
  // },
  methods: {
    changeInputType() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    login() {
        // this.$refs.loginForm.validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.$router.push("/main");
    }
  }
};
</script>


<style scoped>
.demo-ruleForm{
    padding: 30px 70px;
}
.login-container {
  background: #e8e9eb;
  height: 100vh;
  width: 100%;
}
.login-background {
  display: flex;
  align-items: center;
  height: 100vh;
  background: #e8e9e8 url("../../assets/img/loginBg.jpg") no-repeat;
  background-size: cover;
}
.login-form {
  width: 432px;
  height: 504px;
  box-sizing: border-box;
  padding: 62px 0 163px 0;
  margin: 0 auto;
  box-shadow: 0px 25px 40px 0px rgba(14, 5, 9, 0.22);
  background: #fff;
}
.login-form-title {
  font-size: 39px;
  text-align: center;
}
.login-form-text {
  position: relative;
  margin-top: 21px;
  font-size: 24px;
  color: #1989fa;
  text-align: center;
}
.login-form-text:before,
.login-form-text:after {
  content: "";
  position: absolute;
  top: 16px;
  height: 1px;
  width: 33px;
  background-color: #1989fa;
}
.login-form-text:before {
  left: 128px;
}
.login-form-text:after {
  right: 128px;
}
.form-input {
  position: relative;
  width: 351px;
  margin: 20px auto;
}
.form-input img {
  position: absolute;
  top: 78px;
  right: 10px;
  cursor: pointer;
}
.form-input input {
  height: 33px;
  width: 351px;
  padding-left: 40px;
  margin-top: 17px;
  background-position: 10px 4px;
}
.login-btn {
  width: 100%;
  height: 36px;
  border-radius: 5px;
  margin-top: 36px;
  background-color: #1989fa;
  color: #fff;
  border: none;
  outline: none;
}
</style>

<style>
.login-container .el-form-item__content{
    margin-left: 0 !important;
}
</style>
