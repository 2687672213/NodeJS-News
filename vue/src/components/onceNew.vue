<template>
  <div>
    <div class="top"><Headd /></div>
    <div
      class="box131"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ data.newsTitle }}</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>{{ data.newsTitle }}</h2>
      <img :src="data.nwesCover" alt />
      <p>{{ data.newsContent }}</p>
      <span>发表于： {{ time }} (约{{ hourTime }}前)</span>
      <hr />

      <div class="LY">
        <el-form>
          <el-form-item label="留言">
            <el-input placeholder="留言" v-model="ly" class="lyy"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="upLy">发表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mt">
      <div class="LY_l" v-for="item in reply" :key="item.id">
        <span class="user">{{ item.User.nick }}:</span>
        <span class="replyTime"
          >（约{{
            (new Date() - item.replyDate) / 1000 / 60 / 60 > 1
              ? Math.floor((new Date() - item.replyDate) / 1000 / 60 / 60) +
                "小时前"
              : Math.floor((new Date() - item.replyDate) / 1000 / 60) + "分钟前"
          }}
          ）</span
        >
        <span class="reply">{{ item.replyContent }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as axios from "../server/request";
import Headd from "../views/top";
export default {
  components: {
    Headd,
  },
  data() {
    return {
      id: 0, //当前新闻ID
      data: 0, // 当前ID对应的新闻
      time: "", // 新闻发表时间
      hourTime: "", //当前已经过了多少小时
      reply: "", //当前新闻的留言,
      replyLen: 0,
      ly: "",
      loading: true,
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    //请求当前新闻
    axios
      .default()
      .post("api/news/NewSelect", { id: this.id })
      .then((res) => {
        this.data = res.data.data;
        if (this.data) {
          this.loading = false;
        }
        this.time = new Date(+res.data.data.postDate);
        // 计算时间
        const mss = new Date() - res.data.data.postDate;
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        this.hourTime = days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
        //更新当前的点击数
        axios.default().post("api/news/updateHits", {
          id: res.data.data.id,
          hits: res.data.data.hits,
        });
      });
    // 请求所有的留言
    axios
      .default()
      .post("api/reply/replySelect", {
        NewsId: this.id,
      })
      .then((res) => {
        this.reply = res.data.data;
        this.replyLen = res.data.data.length;
        //更新当前的留言数
        axios.default().post("api/news/updateReply", {
          id: this.id,
          reply: res.data.data.length,
        });
      });
  },
  methods: {
    async upLy() {
      if (this.$store.state.loginId) {
        if (this.ly.length == 0) {
          this.$notify({
            type: "error",
            title: "发表失败",
            message: "不能为空啊！",
          });
          return null;
        }
        axios
          .default()
          .post("api/reply/replyAdd", {
            replyContent: this.ly,
            replyDate: new Date().getTime(),
            NewsId: this.id,
            UserId: this.$store.state.loginId.id,
          })
          .then((res) => {
            this.ly = "";
            axios
              .default()
              .post("api/reply/replySelect", {
                NewsId: this.id,
              })
              .then((res) => {
                this.reply = res.data.data;
                this.replyLen = res.data.data.length;
                //更新当前的留言数
                axios.default().post("api/news/updateReply", {
                  id: this.id,
                  reply: res.data.data.length,
                });
              });
          });
      } else {
        localStorage.removeItem("token");
        this.$router.push("/login");
        this.$notify({
          type: "error",
          title: "发表失败",
          message: "请先登录",
        });
      }
    },
  },
};
</script>
<style scoped>
.box131 {
  box-sizing: border-box;
  padding-left: 10%;
  padding-right: 10%;
  width: 70%;
  margin-top: 60px;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  height: calc(100vh - 60px);
  text-align: center;
  float: left;
  line-height: 2em;
}

.LY_l {
  width: calc(100% - 70% - 10px);
  height: 60px;
  float: right;
  background-color: rgba(255, 255, 255, 0.5);
  line-height: 60px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}
.LY_l:hover{
  box-shadow: 0 0 5px 1px orange;
}
.LY_l:nth-of-type(1) {
  margin-top: 60px;
}
/* .box {
  text-align: center;
  margin: 0;
  padding: 0;
  margin-top: 60px;
  widows: 50%;
}
.top {
  width: 10%;
  padding-left: 10%;
  position: fixed;
  top: 0;
  left: 0;
}
*/

.user {
  float: left;
  padding-left: 20px;
  font-weight: 700;
}
.replyTime {
  font-size: 12px;
  float: left;
}
.reply {
  float: left;
  font-size: 14px;
}
</style>