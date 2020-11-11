<template>
  <div class="box">
    <div class="news">
      <router-link to="/" tag="span">新闻系统</router-link>
    </div>
    <div class="btn">
      <template v-if="!token">
        <router-link to="/login">
          <el-button size="mini" round>登录/注册</el-button>
        </router-link>
      </template>
      <template v-else>
        <router-link :to="{ name: 'Info' }">您好！ {{ nick }}</router-link>

        <el-button size="mini" round @click="dis">注销</el-button>
      </template>
    </div>
  </div>
</template>
<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      token: null,
      nick: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    //确认用户
    axios
      .default()
      .get("api/user/whoAmI")
      .then((res) => {
        if (res.data.msg == "查询成功！") {
          this.$store.dispatch("changeLogin", res.data.data);
          sessionStorage.setItem("id", res.data.data.id);
          this.nick = this.$store.state.loginId.nick;
        } else {
          localStorage.removeItem("token");
          sessionStorage.removeItem("id");
          this.$store.dispatch("changeLogin", null);
        }
      });
  },
  methods: {
    dis() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("id");
      this.$store.dispatch("changeLogin", null);
      this.$router.push("/");
      this.$router.go(0);
    },
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 10%;
  box-sizing: border-box;
  padding-right: 10%;
  min-width: 540px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to top, #ace0f9 0%, #6f86d6 100%);
  color: #000;
}

.el-button {
  font-size: 12px;
  margin-left: 10px;
}
.news {
  float: left;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  color: aliceblue;
}
.btn {
  float: right;
  vertical-align: middle;
}
.btn ul,
.btn span,
.btn button {
  display: inline-block;
  vertical-align: middle;
}
.btn ul {
  background-color: rgba(255, 255, 255, 0);
  margin-left: 10px;
  margin-top: -3px;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  color: #7ac5d8;
  text-decoration: underline;
}
</style>