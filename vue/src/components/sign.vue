<template>
  <div>
    <h2>注册</h2>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="nick" @blur="nickYZ"></el-input>
      </el-form-item>
      <el-form-item type="email" label="邮箱">
        <el-input v-model="email" @blur="emailYZ"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="userName" @blur="userNameYZ"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="passWord"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="QRpassWord" @blur="passwordYZ"></el-input>
      </el-form-item>
      <div class="el-login">
        <el-button type="primary" @click="sginFn">立即注册</el-button>
        <el-button @click="resFn">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      nick: "",
      email: "",
      userName: "",
      passWord: "",
      QRpassWord: "",
    };
  },

  methods: {
    // 注册功能
    async sginFn() {
      if (
        this.nickYZ() &&
        this.emailYZ() &&
        (await this.userNameYZ()) &&
        this.passwordYZ()
      ) {
        const ins = await axios.default().put("api/user/userAdd", {
          nick: this.nick,
          userName: this.userName,
          password: this.passWord,
          email: this.email,
        });
        if (ins.data.msg == "添加成功") {
          this.$notify({
            type: "success",
            title: "注册成功！！",
            message: "1s后跳转到登录界面",
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 1000);
        } else {
          this.$notify({
            type: "error",
            title: "提交成功",
            message: "注册失败！！",
          });
        }
      } else {
        this.$notify({
          type: "error",
          title: "提交失败",
          message: "请重新确认所填信息，点击重置即可重置有问题的选项",
        });
      }
    },
    // 重置功能
    async resFn() {
      if (!this.nickYZ()) {
        this.nick = "";
      }
      if (!this.emailYZ()) {
        this.email = "";
      }
      if (!(await this.userNameYZ())) {
        this.userName = "";
      }
      if (!this.passwordYZ()) {
        this.passWord = "";
        this.QRpassWord = "";
      }
    },
    //校验非法字符
    regText(text) {
      var reg = /^[\s\u4e00-\u9fa5a-z0-9_-]{0,}$/;
      if (!reg.exec(text)) {
        return false;
      } else {
        return true;
      }
    },
    // 昵称验证
    nickYZ() {
      if (this.regText(this.nick)) {
        return true;
      } else {
        this.$notify({
          type: "error",
          title: "校验失败",
          message: "昵称有非法字符 / * - + .",
        });
        return false;
      }
    },
    //邮箱验证
    emailYZ() {
      var re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
      if (!re.exec(this.email)) {
        this.$notify({
          type: "error",
          title: "校验失败",
          message: "邮箱验证失败",
        });
        return false;
      } else {
        return true;
      }
    },
    // 账号验证
    async userNameYZ() {
      if (this.regText(this.userName) && this.userName.length >= 6) {
        // 查看数据库有咩有重复
        const data = await axios.default().post("api/user/userSelectOff", {
          userName: this.userName,
        });
        if (data.data.msg == "允许添加") {
          return true;
        } else {
          this.$notify({
            type: "error",
            title: "校验失败",
            message: "检查到该账号已存在",
          });
          return false;
        }
      } else {
        this.$notify({
          type: "error",
          title: "校验失败",
          message: "账号有非法字符 / * - + . 空格等，且长度要大于6位",
        });
        return false;
      }
    },
    //密码验证
    passwordYZ() {
      // console.log(this.passWord,this.QRpassWord)
      if (this.passWord == this.QRpassWord) {
        if (this.passWord.length >= 6) {
          return true;
        } else {
          this.$notify({
            type: "error",
            title: "校验失败",
            message: "密码长度要大于6位",
          });
          return false;
        }
      } else {
        this.$notify({
          type: "error",
          title: "校验失败",
          message: "两次密码输入不一致",
        });
        return false;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.el-form {
  width: 30%;
  margin-top: 20px;
  margin: auto;
}
.el-input {
  width: 100%;
}
.el-login {
  width: 100%;
  overflow: hidden;
  text-align: center;
  margin-top: 30px;
}
</style>