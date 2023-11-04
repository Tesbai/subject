<template>
  <div class="cont">
    <el-tree :data="data" @node-click="handleNodeClick" style="width: 20%;"></el-tree>
    <div class="right">
      <div class="schedule">
        <div class="circle now_state">1</div>
        <div class="line"></div>
        <div class="circle">2</div>
        <div class="line"></div>
        <div class="circle el-icon-check"></div>
      </div>
      <!-- 绑定邮箱 -->
      <div class="email" v-if="email_state">
        <div class="first">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="原邮箱">
              <el-input v-model="email.init_email" disabled></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="email.old_email_code"></el-input>
            </el-form-item>
            <el-button @click="get_email_code">获取验证码</el-button>
            <el-button>下一步</el-button>
          </el-form>
        </div>
        <div class="second" v-if="false">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="新邮箱">
              <el-input v-model="email.new_email"></el-input>
            </el-form-item>
            <el-form-item label="确认邮箱">
              <el-input v-model="email.confirm_email"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="email.new_email_code"></el-input>
            </el-form-item>
          </el-form>
          <el-button>获取验证码</el-button>
          <el-button @click="bind_email">绑定邮箱</el-button>
        </div>
      </div>
      <!-- 更改密码 -->
      <div class="password" v-if="password_state">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="邮箱账号">
            <el-input v-model="email.init_email" disabled></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="password.new_password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="password.confirm_password"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="password.password_code"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="get_password_code">获取验证码</el-button>
        <el-button @click="change_password">更改密码</el-button>
      </div>
      <!-- 上传头像 -->
      <div class="avatar" v-if="avatar_state">
        <el-upload
          class="avatar-uploader"
          action="https://www.chengzier.cn:8000/api/changesuperavator"
          name="avator"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
          ref="upload"
          :headers="headers"
          :on-progress="handleAvatarProgress"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button class="upload_avatar" @click="upload">上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  bindEmail,
  getEmailCode,
  getChangePasswordCoded,
  changePassword
} from "@/api/users";
import cookie from "js-cookie";
export default {
  data() {
    return {
      data: [
        {
          label: "绑定邮箱"
        },
        {
          label: "更改密码"
        },
        {
          label: "上传头像"
        }
      ],
      labelPosition: "left",
      file: null,
      imageUrl: "",
      headers: {
        Authorization: ""
      },
      email_state: true,
      password_state: false,
      avatar_state: false,
      email: {
        init_email: "",
        new_email: "",
        confirm_email:"",
        new_email_code: "",
        old_email_code:""
      },
      password: {
        new_password: "",
        confirm_password: "",
        password_code: ""
      }
    };
  },
  created() {
    this.email.init_email = this.$store.state.userProfile.email;
  },
  computed: {
    init_email_state() {
      if (this.email.init_email) {
        return true;
      }
      return false;
    }
  },
  methods: {
    upload() {
      this.headers["Authorization"] = "Bearer " + this.$store.state.token;
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarProgress(event, file, fileList) {
      console.log(event);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async get_email_code() {
      const res = await getEmailCode("198176040@qq.com");
      console.log(res);
    },
    async bind_email() {
      this.get_email_code();
      const res = await bindEmail(this.email.email_code);
      console.log(res);
    },
    handleNodeClick(data) {
      if (data.label == this.data[0].label) {
        this.email_state = true;
        this.password_state = false;
        this.avatar_state = false;
      } else if (data.label == this.data[1].label) {
        this.email_state = false;
        this.password_state = true;
        this.avatar_state = false;
      } else if (data.label == this.data[2].label) {
        this.email_state = false;
        this.password_state = false;
        this.avatar_state = true;
      }
    },
    async get_password_code() {
      const res = await getChangePasswordCoded();
      console.log(res);
    },
    async change_password() {
      await changePassword(this.password);
      if (res.data.status == "success") {
        cookie.remove("id");
        this.$store.state.token = "";
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.cont {
  display: flex;
  justify-content: left;
}

.right {
  width: 50%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.avatar {
  border: 1px solid transparent;
  margin-bottom: 20px;
}
.schedule {
  height: 100px;
  margin: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.email,
.password {
  width: 500px;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: skyblue;
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.line {
  width: 150px;
  height: 10px;
  background-color: skyblue;
}
.now_state {
  background-color: blue;
}
</style>