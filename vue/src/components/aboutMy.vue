<template>
  <div class="zxcc">
    <h3>基本信息修改</h3>
    <p>
      昵称：
      <el-input v-model="nick"></el-input>
    </p>
    <p>
      邮箱：
      <el-input v-model="email"></el-input>
    </p>
    <p>
      密码：
      <el-input v-model="password"></el-input>
    </p>
    <h3><el-button type="primary" @click="upDateFn">修改</el-button></h3>
  </div>
</template>
<style scoped>
.zxcc {
  box-sizing: border-box;
  padding-left: 10%;
  padding-right: 10%;
}
h3 {
  text-align: center;
}
</style>
<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      data: 0,
      nick: 0,
      email: 0,
      password: 0,
      id: 0,
    };
  },
  mounted() {
    // if (this.$store.state.loginId) {
    this.data = this.$store.state.loginId;
    this.nick = this.data.nick;
    this.email = this.data.email;
    this.password = this.data.password;
    this.id = this.data.id;
    // }
  },
  methods: {
    upDateFn() {
      if (this.password && this.nick && this.password) {
        axios
          .default()
          .post("api/user/upDate", {
            id: this.id,
            userObj: {
              nick: this.nick,
              email: this.email,
              password: this.password,
            },
          })
          .then((data) => {
            if (data.data.msg == "修改成功") {
              this.$notify({
                type: "success",
                title: "修改成功",
                message: "1s后跳转",
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              this.$notify({
                type: "error",
                title: "修改失败",
              });
            }
          });
      } else {
        this.$notify({
          type: "error",
          title: "请检查是否为空项",
        });
      }
    },
  },
  //
};
</script>