<template>
  <div>
    <mainTop />
    <div class="nav">
      <el-menu  class="el-menu-vertical-demo">
        <router-link :to="{ name: 'addNews' }" tag="span">
          <el-menu-item index="1">
            <i class="el-icon-upload2"></i>
            <span slot="title">发布新闻</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'newsUp' }" tag="span">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">我的新闻</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'myReply' }" tag="span">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">我的评论</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'about' }" tag="span">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">关于我的</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <div class="content">
      <router-view class="connn"></router-view>
    </div>
  </div>
</template>
<script>
import mainTop from "../views/top";
export default {
  components: {
    mainTop,
  },
};
</script>
<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  min-height: calc(100vh - 60px);
}
.nav {
  margin-top: 60px;
  float: left;
}
.content {
  margin-top: 60px;
  width: calc(100% - 201px);
  min-height: calc(100vh - 60px);
  background-color: rgba(255, 255, 255, 0.5);
  float: left;
}
.connn {
  min-height: calc(100vh - 60px);
  /* margin-top: -20px; */
}
</style>