<template>
  <div
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h2>我发表的评论</h2>
    <template v-if="arr != 0"
      ><div class="tem" v-for="(item, i) in arr" :key="item.id + i">
        <span class="heading">新闻标题：</span>
        <span class="heading_sub">{{ item.News.newsTitle }}</span
        ><br />
        <span class="comment">评论内容：</span>
        <span class="comment_sub">{{ item.replyContent }}</span>
        <span class="right">
          <router-link :to="{ name: 'noceNew', params: { id: item.News.id } }">
            <el-button icon="el-icon-search" circle></el-button
          ></router-link>
          <el-button
            icon="el-icon-delete"
            circle
            class="delete"
            @click="deleteFn(item.id)"
          >
          </el-button>
        </span></div
    ></template>
    <template v-else><div class="none">暂无数据</div></template>
  </div>
</template>

<script>
import * as axios from "../server/request";
export default {
  data() {
    return {
      arr: 0,
    };
  },
  mounted() {
    axios
      .default()
      .post("api/reply/mypl", {
        userId: sessionStorage.getItem("id"),
      })
      .then((data) => {
        this.arr = data.data.data;
      });
  },
  methods: {
    deleteFn(id1) {
      this.$alert("你确定要删除这条评论吗？", "删除", {
        confirmButtonText: "确定",
        callback: (action) => {
          axios
            .default()
            .post("api/reply/deleteReply", {
              id: id1,
            })
            .then((data) => {
              if (data.data.msg == "ok") {
                location.reload();
              }
            });
        },
      });
    },
  },
};
</script>



<style scoped>
h2 {
  text-align: center;
}
.tem {
  width: 90%;
  height: 85px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.5s;
  box-shadow: 0 0 5px 3px #ccc;
  cursor: pointer;
  line-height: 40px;
  padding-left: 20px;
  padding-right: 30px;
  box-sizing: border-box;
}
.heading {
  font-size: 18px;
  font-weight: 600;
}
.heading_sub {
  font-size: 16px;
  font-weight: 600;
}
.comment {
  font-size: 18px;
  font-weight: 600;
}
.comment_sub {
  font-size: 16px;
  font-weight: 00;
}
.tem:hover {
  transform: scale(1.05);
}

.none {
  font-size: 14px;
  color: red;
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
  position: relative;
  bottom: 15px;
}
.delete {
  color: #fff;
  background-color: rgba(236, 31, 31, 0.699);
}
.delete :hover {
  color: skyblue;
  background-color: rgb(248, 41, 41);
}
</style>