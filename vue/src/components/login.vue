<template>
  <div>
    <div class="top"><headerL /></div>

    <div class="container">
      <div class="main">
        <div class="bg"></div>
        <div class="formone">
          <div class="title">My forms</div>
          <div class="username">
            <input
              type="text"
              name="username"
              id=""
              v-model="userName"
              value=""
              placeholder="请输入账号"
            />
          </div>
          <div class="password">
            <input
              type="password"
              name="username"
              v-model="password"
              id=""
              value=""
              placeholder="请输入密码"
            />
          </div>
          <div class="verification">是否验证？</div>
          <div class="loginbtn">
            <button type="button" @click="LoginFn">登录</button>
          </div>
          <div class="registerbtn">
            <button type="button">注册</button>
          </div>
        </div>
        <div class="registerpage">
          <div class="formtwo">
            <div class="registertitle">注册</div>
            <div class="savename">
              <input
                type="text"
                placeholder="请输入昵称"
                v-model="nick"
                @blur="nickYZ"
              />
            </div>
            <div class="savename">
              <input
                type="text"
                placeholder="请输入邮箱"
                v-model="email"
                @blur="emailYZ"
              />
            </div>
            <div class="savename">
              <input
                type="text"
                placeholder="请输入账号"
                v-model="userName"
                @blur="userNameYZ"
              />
            </div>
            <div class="savename">
              <input type="text" placeholder="请输入密码" v-model="passWord" />
            </div>
            <div class="savepassword">
              <input
                type="password"
                placeholder="请确认密码"
                v-model="QRpassWord"
                @blur="passwordYZ"
              />
            </div>
            <div class="btn_list">
              <div class="okbtn">
                <button type="button" @click="sginFn">确认</button>
              </div>
              <div class="resetbtn"><button type="button">撤销</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as axios from "../server/request";
import headerL from "../views/top";
export default {
  components: {
    headerL,
  },
  data() {
    return {
      userName: "",
      password: "",
      nick: "",
      email: "",
      userName: "",
      passWord: "",
      QRpassWord: "",
    };
  },
  mounted() {
    let formone = document.querySelector(".formone");
    let registerpage = document.querySelector(".registerpage");
    let registerbtn = document.querySelector(".registerbtn");
    let resetbtn = document.querySelector(".resetbtn");
    registerbtn.addEventListener("click", () => {
      formone.style.display = "none";
      registerpage.style.display = "flex";
    });
    resetbtn.addEventListener("click", () => {
      formone.style.display = "flex";
      registerpage.style.display = "none";
    });
  },

  methods: {
    //   登录方法
    async LoginFn() {
      if (!this.userName || !this.password) {
        this.userPError();
        return false;
      }
      const data = await axios.default().post("api/user/login", {
        userName: this.userName,
        password: this.password,
      });
      if (data.data.msg == "登陆失败！") {
        this.loginError();
      } else {
        this.$router.push("/");
        this.$router.go(0);
      }
    },
    //重置方法
    resFn() {
      this.userName = "";
      this.password = "";
    },

    //登陆失败错误弹出层
    loginError() {
      this.$notify({
        type: "error",
        title: "登陆失败",
        message: "您的账号或密码错误",
      });
    },

    //账号密码校验错误
    userPError() {
      this.$notify({
        type: "error",
        title: "校验失败",
        message: "账号或密码为空",
      });
    },
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
          });
          let resetbtn1 = document.querySelector(".resetbtn");
          resetbtn1.click();
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
          message: "请重新确认所填信息",
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
*,
body,
html,
ul,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
  cursor: pointer;
}
.top {
  position: fixed;
  z-index: 100;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
 background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 800px;
}

.container .main {
  width: 500px;
  height: 500px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  background: #a6c1ee;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 800px;
  animation: mainplay 1s linear forwards;
}
@keyframes mainplay {
  from {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
.container .main .registerpage {
  width: 100%;
  height: 100%;
  position: absolute;
}

.container .main .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(#6c39c7, #65f0ffbd);
  z-index: -1;
  animation: clipplay 2s infinite alternate linear;
}

@keyframes clipplay {
  from {
    clip-path: polygon(
      20% 0%,
      0% 20%,
      9% 50%,
      0% 80%,
      20% 100%,
      53% 93%,
      80% 100%,
      100% 80%,
      89% 50%,
      100% 20%,
      80% 0%,
      48% 13%
    );
  }

  to {
    clip-path: polygon(
      20% 0%,
      0% 20%,
      0 52%,
      0% 80%,
      20% 100%,
      50% 100%,
      80% 100%,
      100% 80%,
      100% 48%,
      100% 20%,
      80% 0%,
      48% 0
    );
  }
}

.container .main .formone {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* display: none; */
}

.container .main .formone div {
  width: 100%;
  flex: 1;
  text-align: center;
}

.container .main .formone .title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6ad6c8f0;
  font-size: 40px;
}

.container .main .formone .username {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .main .formone input {
  width: 100%;
  height: 70%;
  line-height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  outline: none;
  text-align: center;
  box-shadow: 0px 0px 2px 0px #6c569a;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: white;
  font-size: 16px;
}

.container .main .formone input:hover {
  box-shadow: 0px 0px 20px 0px #4787d2;
}

.container .main .formone button {
  width: 100%;
  height: 70%;
  line-height: 100%;
  border-radius: 5px;
  border: none;
  background: #714cac;
  color: white;
  outline: none;
}

.container .main .formone .loginbtn,
.container .main .formone .registerbtn {
  position: relative;
}

.btnbg {
  width: 0% !important;
  height: 70%;
  position: absolute;
  left: 50%;
  background: linear-gradient(#9756e2, #495a73);
  transition: all 1s;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  letter-spacing: 5px;
  border-radius: 5px;
}

/* .container .main .formone .registerbtn:hover .btnbg,
.container .main .formone .loginbtn:hover .btnbg {
  width: 100% !important;
  left: 0%;
} */

.container .main .registerpage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  display: none;
}

.container .main .formtwo {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container .main .formtwo > div {
  width: 100%;
  flex: 1;
  text-align: center;
}

.container .main .formtwo .registertitle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6ad6c8f0;
  font-size: 40px;
}

.container .main .formtwo input {
  width: 100%;
  height: 60%;
  line-height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  outline: none;
  text-align: center;
  margin-top: -30px;
  box-shadow: 0px 0px 2px 0px #6c569a;
}
.container .main .formtwo input:hover {
  box-shadow: 0px 0px 20px 0px #4787d2;
}
.container .main .formtwo .btn_list {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container .main .formtwo .btn_list > div {
  width: 100%;
}
.container .main .formtwo .btn_list button {
  width: 80%;
  height: 35%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
}
.container .main .formtwo .btn_list button:hover {
  background: #5278cafc;
}
</style>