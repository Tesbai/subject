<template>
  <div class="mask">
    <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="text">
          <el-input maxlength="4" v-model="ruleForm.text" style="width:80%;"></el-input>
          <img :src="url" class="code_img" @click="replaceCodeImage()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { login } from "@/api/users";
import cookie from "js-cookie";
export default {
  data() {
    var validatorUsername = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('用户名不能为空！'))
      }
      if(/\w{5,12}/g.test(value)){
        callback();
      }else{
        callback(new Error('用户名格式错误！'))
      }
    }
    var validatorPassword = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('密码不能为空！'))
      }
      if(/\w{6,12}/g.test(value)){
        callback();
      }else{
        callback(new Error('密码格式错误！'))
      }
    }
    var validatorText = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('验证码不能为空！'))
      }
      if(/\w{4}/g.test(value)){
        callback();
      }else{
        callback(new Error('验证码格式错误！'))
      }
    }
    return {
      ruleForm: {
        username: "",
        password: "",
        text: ""
      },
      url: "",
      uid: null,
      timer:0,
      rules:{
        username:[
          {validator:validatorUsername, trigger:'blur'}
        ],
        password:[
          {validator:validatorPassword, trigger:'blur'}
        ],
        text:[
          {validator:validatorText, trigger:'blur'}
        ]
      }
    };
  },
  created() {
    this.generateCodeImage();
    this.timer = setInterval(() => {
      this.generateCodeImage();
    }, 1000*60);
  },
  methods: {
    generateCodeImage() {
      this.uid = uuid();
      this.url = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${this.uid}`;
    },
    replaceCodeImage() {
      this.generateCodeImage();
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.generateCodeImage();
      }, 1000*60);
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    submitForm(formName){
      this.$refs[formName].validate(async (valid)=> {
        if(valid){
          try {
            const { data } = await login(Object.assign({ uuid: this.uid }, this.ruleForm))
            if(data.status == 'error'){
              this.$message.error(data.msg)
            }else{
              cookie.set('id', data.token,{
                expires:1
              })
              this.$store.commit("writeToken", data.token)
              this.$message({
                message:'恭喜你，登录成功……',
                type:'success'
              })
              this.$router.push('/')
            }
          }catch(err){
            this.$message.error('登录异常，请稍后重试')
          }
        }else{
          return false;
        }
      })
    }
  },
  destroyed(){
    clearInterval(this.timer);
  }
};
</script>

<style>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 600px;
  border-radius: 5px;
  background-color: #fff;
  padding: 40px 40px 20px 0;
}

.code_img {
  width: 20%;
  height: 100%;
  position: absolute;
}
</style>