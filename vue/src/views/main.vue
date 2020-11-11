<template>
  <div id="app">
    <div class="app_top">
      <mainTop />
    </div>
    <div
      class="app_content"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)"
    >
      <div class="boxM">
        <!-- 渲染体部分 -->
        <div class="tem" v-for="item in info" :key="item.id" :data-id="item.id">
          <router-link
            :to="{ name: 'noceNew', params: { id: item.id } }"
            tag="div"
          >
            <img :src="item.nwesCover" alt />
            <div class="info">
              <div class="info_on">
                <h2>{{ item.newsTitle }}</h2>
                <p>{{ item.newsSynopsis }}</p>
              </div>
              <div class="info_in">
                <i class="el-icon-user-solid"></i>
                <span>{{ item.User.nick }}</span>
                <i class="el-icon-s-comment"></i>
                <span>{{ item.replies }}</span>
                <i class="el-icon-view"></i>
                <span>{{ item.hits }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 按钮部分 -->
        <div class="btnz">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              @click="upFn"
              :disabled="index !== 1 ? false : true"
              >上一页</el-button
            >
            <el-button
              type="primary"
              @click="downFn"
              :disabled="index !== count ? false : true"
            >
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
          <div class="text">
            <span>{{ index }}页</span>
            /
            <span>{{ count }}页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  min-width: 1500px;
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: -1;
  overflow: hidden;
}
.app_top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
}
.app_content {
  height: 100vh;
  width: 100%;
  margin: 60px auto;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  /* background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%); */
  /* background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%); */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.boxM {
  margin: 0;
  padding: 0;
  height: cacl(100vh - 60px);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.tem {
  width: 320px;
  height: 400px;
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); */
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); */
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px #ccc;
  cursor: pointer;
  transition: all 0.5s;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.tem:hover {
  box-shadow: 0 0 5px 3px orange;
}
.tem img {
  width: 300px;
  height: 160px;
}
.tem .info {
  display: inline-block;
  height: 200px;
  width: 90%;
  margin-left: 10px;
  box-sizing: border-box;
  vertical-align: top;
  position: relative;
}
.tem .info h2 {
  margin: 0;
}
.tem .info .info_on {
  padding-left: 20px;
}
.tem .info .info_in {
  position: absolute;
  bottom: 10px;
}
.tem .info .info_in i {
  padding-left: 20px;
}
.el-button-group {
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.text {
  padding-top: 10px;
  text-align: center;
}
.btnz {
  width: 100%;
  position: fixed;
  bottom: 5px;
}
</style>
<script>
import mainTop from "../views/top";
import * as axios from "../server/request";
export default {
  components: {
    mainTop,
  },
  data() {
    return {
      info: null,
      count: 0,
      index: 1,
      loading: true,
    };
  },
  mounted() {
    // 获取新闻
    axios
      .default()
      .post("api/news/getNews", {
        index: this.index,
        number: 4,
      })
      .then((res) => {
        this.info = res.data.data.rows;
        if (res.data.data.rows) {
          this.loading = false;
        }
        this.count = Math.ceil(res.data.data.count / 4);
      });
  },
  methods: {
    upFn() {
      this.loading = true;
      this.index = this.index - 1;
      if (this.index <= 0) {
        this.index = 1;
      }
      axios
        .default()
        .post("api/news/getNews", {
          index: this.index,
          number: 4,
        })
        .then((res) => {
          this.info = res.data.data.rows;
          if (this.info) {
            this.loading = false;
          }
        });
    },
    downFn() {
      this.loading = true;
      this.index = this.index + 1;
      if (this.index >= this.count) {
        this.index = this.count;
      }
      axios
        .default()
        .post("api/news/getNews", {
          index: this.index,
          number: 4,
        })
        .then((res) => {
          this.info = res.data.data.rows;
          if (this.info) {
            this.loading = false;
          }
        });
    },
  },
};
</script>