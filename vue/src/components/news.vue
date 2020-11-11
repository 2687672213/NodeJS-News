<template>
  <div
    class="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 渲染体部分 -->
    <div class="tem" v-for="item in info" :key="item.id" :data-id="item.id">
      <router-link :to="{name:'noceNew',params:{id:item.id}}" tag="div">
        <img :src="item.nwesCover" alt />
        <div class="info">
          <div class="info_on">
            <h2>{{item.newsTitle}}</h2>
            <p>{{item.newsSynopsis}}</p>
          </div>
          <div class="info_in">
            <i class="el-icon-user-solid"></i>
            <span>{{item.User.nick}}</span>
            <i class="el-icon-s-comment"></i>
            <span>{{item.replies}}</span>
            <i class="el-icon-view"></i>
            <span>{{item.hits}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 按钮部分 -->
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        @click="upFn"
        :disabled="index !== 1?false:true"
      >上一页</el-button>
      <el-button type="primary" @click="downFn" :disabled="index !== count?false:true">
        下一页
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>
    <div class="text">
      <span>{{index}}页</span>
      /
      <span>{{count}}页</span>
    </div>
  </div>
</template>
<script>
import * as axios from "../server/request";
export default {
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
        number: 5,
      })
      .then((res) => {
        this.info = res.data.data.rows;
        if (res.data.data.rows) {
          this.loading = false;
        }
        this.count = Math.ceil(res.data.data.count / 5);
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
          number: 5,
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
          number: 5,
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
<style scoped>
.box {
  margin: 0;
  padding: 0;
  height: 1200px;
}
.tem {
  width: 90%;
  height: 200px;
  background-color: aliceblue;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px #ccc;
  cursor: pointer;
  transition: all 0.5s;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.tem:hover {
  transform: scale(1.05);
}
.tem img {
  width: 300px;
  height: 180px;
}
.tem .info {
  display: inline-block;
  height: 180px;
  width: 600px;
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
</style>