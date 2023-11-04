<template>
  <div>
    <Add v-if="add_state" @add_video="add_video" @upload="upload" :chapter_id="chapter_id"></Add>
    <el-button @click="add_video">新增视频</el-button>
    <div class="find_video">
      <el-select v-model="value_subject" :placeholder="value_subject" @change="change">
        <el-option v-for="item in subject" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select v-model="value_chapter" :placeholder="value_chapter" @change="change_chapter">
        <el-option v-for="item in chapter" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </div>
    <Bullet v-if="cont_state"></Bullet>
    <div class="video" v-for="(item, index) in video_src" :key="item.id">
      <video :src="item" controls muted height="300px" width="70%"></video>
      <div class="btn">
        <el-button @click="upload_video(index)">更新</el-button>
        <el-button @click="delete_video(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Bullet from "./bullet.vue";
import Add from "./add.vue";
import { getSubject } from "@/api/subject";
import { getChapter } from "@/api/chapter";
import { getVideo, deleteVideo } from "@/api/video";
export default {
  components: {
    Bullet,
    Add
  },
  data() {
    return {
      cont_state: false,
      add_state: false,
      subject: [],
      chapter: [],
      value_subject: "",
      value_chapter: "",
      video: [],
      video_src: [],
      chapter_id: ""
    };
  },
  async created() {
    if (!this.$store.state.subject.state && !this.$store.state.chapter.state) {
      try {
        const res = await getSubject();
        this.subject = res.data.data;
        const result = await getChapter(this.subject[0].id);
        this.chapter = result.data.data;
      } catch (e) {
        console.log(e);
      }
    } else {
      this.subject = this.$store.state.subject.list;
      this.chapter = this.$store.state.chapter.chapter_list;
    }
    this.value_subject = this.subject[0].name;
    this.value_chapter = this.chapter[0].name;
    this.chapter_id = this.chapter[0].id;
    this.get_video();
  },
  methods: {
    async add_video() {
      this.add_state = !this.add_state;
    },
    upload(){
      this.add_video();
      this.get_video(this.chapter_id)
    },
    async get_video(id = this.chapter[0].id) {
      this.video_src = []
      if (this.chapter.length != 0) {
        this.cont_state = false;
        const res = await getVideo(id);
        this.video = res.data.data;
        this.video.forEach(item => {
          let temp = item.mp4_url.split(".mp4");
          this.video_src.push(
            `https://www.chengzier.cn:9000/api/videoplay?path=${temp[0]}`
          );
        });
      } else {
        this.cont_state = true;
      }
    },
    async change(value) {
      let select_subject = this.subject.filter(item => {
        if (item.name == value) {
          return true;
        }
      });
      const res = await getChapter(select_subject[0].id);
      this.chapter = res.data.data;
      this.chapter_id = this.chapter[0].id
      this.value_chapter = this.chapter[0].name
      this.get_video(this.chapter[0].id);
    },
    async change_chapter(value) {
      let select_chapter = this.chapter.filter(item => {
        if (item.name == value) {
          return true;
        }
      });
      this.chapter_id = select_chapter[0].id
      this.get_video(select_chapter[0].id);
    },
    async delete_video(index){
      await deleteVideo(this.video[index].id)
      this.get_video(this.chapter_id);
    },
    async upload_video(index){

      this.delete_video(index);
      this.add_video(this.chapter_id)
    }
  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.find_video {
  margin-top: 20px;
  display: flex;
}
.dropdown_menu {
  height: 300px;
  overflow-y: scroll;
}

.video {
  margin-top: 20px;
  display: flex;
}
.video {
  border: 1px solid black;
  margin-left: 20px;
  position: relative
}
.btn{
  position: absolute;
  top: 50%;
  right: 0;
}
</style>