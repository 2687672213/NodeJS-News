<template>
  <div class="box">
    <h2>发表新闻</h2>
    <el-form ref="form" label-width="80px">
      <el-form-item label="新闻标题">
        <el-input v-model="newsTitle" @blur="newsTitleYZ" maxlength="20" ></el-input>
      </el-form-item>
      <el-form-item label="新闻简介">
        <el-input v-model="newsSynopsis" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="新闻插图">
        <el-input v-model="nwesCover" maxlength="255" @blur="newsCoverYZ" placeholder="请填写网上复制到图片URL，不写也可以我们会写默认图片"></el-input>
      </el-form-item>
      <el-form-item label="主要内容">
        <el-input type="textarea" maxlength="255" v-model="newsContent" @blur="newsContentYZ"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnFn">发表</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      newsTitle: "",
      newsSynopsis: "",
      newsContent: "",
      nwesCover: "",
    };
  },

  methods: {
    btnFn() {
      const obj = {
        newsTitle: this.newsTitle,
        newsSynopsis: this.newsSynopsis,
        nwesCover: this.nwesCover,
        newsContent: this.newsContent,
        postDate: new Date().getTime(),
        UserId: sessionStorage.getItem("id"),
      };
      if (this.newsTitleYZ() && this.newsCoverYZ() && this.newsContentYZ()) {
        axios
          .default()
          .post("api/news/NewsAdd", obj)
          .then((res) => {
            if (res.data.msg == "OK") {
              this.$notify({
                type: "success",
                title: "新闻发布成功",
                message: "1s后跳转",
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              this.$notify({
                type: "error",
                title: "添加失败",
                message: "新闻发布失败",
              });
            }
          });
      }
    },
    // 标题验证
    newsTitleYZ() {
      if (this.newsTitle.length == 0) {
        this.userPError("验证失败", "标题不允许为空");
        return false;
      } else {
        return true;
      }
    },
    // 图片路径验证
    newsCoverYZ() {
      const reg = /http[\w\W]*/gi;
      if (this.nwesCover.length == 0) {
        return true;
      }
      if (!reg.exec(this.nwesCover)) {
        this.userPError(
          "验证失败",
          "你可以不写但不可以瞎写，要求是一个图片的URL"
        );
        return false;
      } else {
        return true;
      }
    },
    // 内容验证
    newsContentYZ() {
      if (this.newsContent.length == 0) {
        this.userPError("验证失败", "内容不允许为空");
        return false;
      } else {
        return true;
      }
    },
    // 错误处理函数
    userPError(title = "验证失败", mess) {
      this.$notify({
        type: "error",
        title: title,
        message: mess,
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: auto;
  text-align: center;
}
</style>