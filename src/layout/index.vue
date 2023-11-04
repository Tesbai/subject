<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        :collapse="collapse"
        router
        :default-active="path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/subject">
          <i class="el-icon-date"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/chapter">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">章节管理</span>
        </el-menu-item>
        <el-menu-item index="/video">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/usernews">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @switch_menu="change" :isCollapse="collapse"></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      path: "/dashboard"
    };
  },
  computed: {
    collapse() {
      return this.$store.state.isCollapse;
    }
  },
  created() {
    this.path = this.$route.path;
  },
  watch: {
    $route(newValue) {
      document.title = newValue.meta.title;
    }
  },
  methods: {
    change() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style>
html,
body,
#app,
.el-container,
.el-menu {
  height: 100%;
}

.el-header {
  padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>