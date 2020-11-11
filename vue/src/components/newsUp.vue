<template>
  <div
    v-loading="load"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h2>我发表的新闻</h2>
    <template v-if="data">
      <div class="tem" v-for="item in data" :key="item.id">
        <span>新闻标题：{{ item.newsTitle }}</span>
        <span class="right">
          <router-link :to="{ name: 'noceNew', params: { id: item.id } }">
            <el-button icon="el-icon-search" circle></el-button>
          </router-link>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="ZK(item)"
            class="left"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Delete(item)"
          ></el-button>
        </span>
      </div>
    </template>
    <template v-else>
      <div class="none">暂无数据</div>
    </template>

    <el-drawer
      title="修改发布的新闻"
      :before-close="cancelForm"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form>
          <el-form-item label="新闻标题">
            <el-input
              v-model="newsTitle"
              @blur="newsTitleYZ"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="新闻简介">
            <el-input v-model="newsSynopsis" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="新闻插图">
            <el-input
              maxlength="255"
              v-model="newsCover"
              @blur="newsCoverYZ"
              placeholder="请填写网上复制到图片URL，不写也可以我们会写默认图片"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要内容">
            <el-input
              type="textarea"
              v-model="newsContent"
              @blur="newsContentYZ"
              maxlength="255"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="TJ">提交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      newsTitle: "",
      newsSynopsis: "",
      newsCover: "",
      newsContent: "",
      formLabelWidth: "80px",
      timer: null,
      data: "",
      userId: 0,
      load: true,
      newId: 0,
    };
  },
  methods: {
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    btnFn() {
      const obj = {
        newsTitle: this.newsTitle,
        newsSynopsis: this.newsSynopsis,
        nwesCover: this.nwesCover,
        newsContent: this.newsContent,
        postDate: new Date().getTime(),
        UserId: this.$store.state.loginId.id,
      };
      if (this.newsTitleYZ() && this.newsCoverYZ() && this.newsContentYZ()) {
        axios
          .default()
          .post("api/news/NewsAdd", obj)
          .then((res) => {
            if (res.data.msg == "OK") {
              this.$notify({
                type: "success",
                title: "添加成功",
                message: "新闻发布成功",
              });
            }
          });

        this.$router.push("/");
        this.$route.go(0);
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
      if (this.newsCover.length == 0) {
        return true;
      }
      if (!reg.exec(this.newsCover)) {
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
    // 进入修改界面
    ZK(data) {
      this.dialog = true;
      this.newsTitle = data.newsTitle;
      this.newsSynopsis = data.newsSynopsis;
      this.newsCover = data.nwesCover;
      this.newsContent = data.newsContent;
      this.newId = data.id;
    },
    // 修改
    async TJ(data) {
      const obj = {
        newsTitle: this.newsTitle,
        newsSynopsis: this.newsSynopsis,
        nwesCover: this.newsCover,
        newsContent: this.newsContent,
      };
      if (this.newsTitleYZ() && this.newsCoverYZ() && this.newsContentYZ()) {
        axios
          .default()
          .post("api/news/updateNews", {
            id: this.newId,
            news: obj,
          })
          .then((res) => {
            if (res.data.msg == "OK") {
              this.$notify({
                type: "success",
                title: "修改成功",
                message: "1s后跳转到新闻页",
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              this.$notify({
                type: "error",
                title: "添加失败",
                message: "新闻修改失败",
              });
            }
          });
      }
    },
    // 删除
    async Delete(data) {
      const id = data.id;
      this.load = true;
      this.$alert("你点击的是删除按钮", "删除", {
        confirmButtonText: "确定",
        callback: (action) => {
          axios
            .default()
            .post("api/news/deleteNes", { id: id })
            .then((res) => {
              axios
                .default()
                .post("api/news/getUserNews", {
                  id: this.userId,
                })
                .then((res) => {
                  if (JSON.stringify(res.data.data) == "[]") {
                    this.data = null;
                  } else {
                    this.data = res.data.data;
                    if (this.userId) {
                      this.load = false;
                    }
                  }
                });
            });
        },
      });
    },
  },
  mounted() {
    this.userId = sessionStorage.getItem("id");
    axios
      .default()
      .post("api/news/getUserNews", {
        id: this.userId,
      })
      .then((res) => {
        if (JSON.stringify(res.data.data) == "[]") {
          this.data = null;
        } else {
          this.data = res.data.data;
          if (this.userId) {
            this.load = false;
          }
        }
      });
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.tem {
  width: 90%;
  height: 50px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.5s;
  box-shadow: 0 0 5px 3px #ccc;
  cursor: pointer;
  line-height: 30px;
  padding-left: 20px;
  padding-right: 30px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
}
.tem:hover {
  transform: scale(1.01);
}
.tem span {
  vertical-align: middle;
}
.none {
  font-size: 14px;
  text-align: center;
  width: 90%;
  height: 50px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #ccc;
  cursor: pointer;
  line-height: 50px;
}
.right {
  float: right;
}
.left {
  margin-left: 10px;
}
.el-drawer .ltr .demo-drawer {
  text-align: center;
}
.demo-drawer__content {
  text-align: center;
}
</style>