<template>
  <div class="mask">
    <div class="form">
      <el-upload
        class="upload-demo"
        action="https://www.chengzier.cn:8000/api/chapter_video"
        :limit="1"
        name="video"
        :auto-upload="false"
        :headers="headers"
        ref="upload"
        :data="video_data"
        :on-success="res"
        :on-change="change"
      >
        <el-button size="small" type="primary">选择视频</el-button>
      </el-upload>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="video_data.name"></el-input>
        </el-form-item>
        <el-form-item label="章节id">
          <el-input v-model="video_data.chapter_id"></el-input>
        </el-form-item>
        <el-form-item label="是否收费">
          <el-input v-model="video_data.permission"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="upload">添加</el-button>
        <el-button @click="cancle">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addVideo } from "@/api/video";

export default {
  data() {
    return {
      labelPosition: "left",
      headers: {
        Authorization: ""
      },
      video_data:{
        name:'',
        chapter_id:'',
        permission:''
      }
    };
  },
  props: [
    "chapter_id"
  ],
  created(){
    this.video_data.chapter_id = this.chapter_id
  },
  methods: {
    upload() {
      this.headers["Authorization"] = "Bearer " + this.$store.state.token;
      this.$refs.upload.submit();
    },
    res(e){
        this.$emit("upload");
    },
    change(file, fileList){
        
    },
    cancle() {
      this.$emit("add_video");
    }
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.form {
  background-color: #fff;
  border-radius: 10px;
  width: 500px;
  padding: 30px;
}

.btn {
  display: flex;
  justify-content: space-around;
}
</style>