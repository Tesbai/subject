<template>
  <div class="header">
    <Bullet v-if="register_state" :register_state="register_state" @register_state_change="registerAccount" :title="title">
      <template v-slot:confirm_register>
        <div>确认注册</div>
      </template>
    </Bullet>
    <div>
      <i :class="classList" @click="switch_menu"></i>
    </div>
    <div class="header-right">
      <i class="el-icon-circle-plus-outline register" @click="registerAccount"></i>
      <router-link to="/usernews">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar shape="square" :src="url"></el-avatar>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// import cookie from "js-cookie";
// import store from "@/store";
import Bullet from "@/views/Bullet";
export default {
  data() {
    return {
      classList: {
        "el-icon-s-fold": true,
        "el-icon-s-unfold": false,
        switch: true
      },
      register_state: false,
      title:'注册'
    };
  },
  components: {
    Bullet
  },
  computed: {
    url() {
      return this.$store.state.userProfile.avator;
    }
  },
  created() {
    if (this.$store.state.isCollapse) {
      this.classList["el-icon-s-fold"] = !this.classList["el-icon-s-fold"];
      this.classList["el-icon-s-unfold"] = !this.classList["el-icon-s-unfold"];
    }
  },
  methods: {
    switch_menu() {
      this.$store.commit("reWriteIsCollapse");
      this.classList["el-icon-s-fold"] = !this.classList["el-icon-s-fold"];
      this.classList["el-icon-s-unfold"] = !this.classList["el-icon-s-unfold"];
    },
    registerAccount() {
      this.register_state = !this.register_state;
    },
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  z-index: 9999;
}

.switch {
  font-size: 28px;
  cursor: pointer;
}

.avatar {
  width: 100px;
  height: 100px;
}

.header-right {
  display: flex;
  justify-content: center;
}

.register {
  font-size: 45px;
  margin-right: 20px;
}
</style>