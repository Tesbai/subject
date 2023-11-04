<template>
  <div class="mask">
    <div class="add">
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item :label="title">
          <input type="text" v-focus v-model="name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add(name)" v-if="add_state">
            <slot name="confirm_add"></slot>
          </el-button>
          <el-button type="primary" @click="edit(name)" v-if="change_state">
            <slot name="confirm_change"></slot>
          </el-button>
          <el-button type="primary" @click="register(name)" v-if="register_state">
            <slot name="confirm_register"></slot>
          </el-button>
          <el-button type="primary" @click="chapter_change_button(name)" v-if="chapter_state">
            <slot name="confirm_changeChapter"></slot>
          </el-button>
          <el-button type="primary" @click="add_chapter(name)" v-if="add_chapter_state">
            <slot name="confirm_addChapter"></slot>
          </el-button>
          <el-button type="primary" @click="cancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
import { addSubject, changeSubject } from "@/api/subject";
import { changeChapter, addChapter } from "@/api/chapter";
import { createUser } from "@/api/users";
export default {
  data() {
    return {
      labelPosition: "left",
      name: "",
      value1: "",
      // add_chapter_id: ""
    };
  },
  props: [
    "title",
    "add_state",
    "change_state",
    "register_state",
    "chapter_state",
    "edit_text",
    "chapter_edit_id",
    "add_chapter_state",
    "add_chapter_id"
  ],
  methods: {
    cancle() {
      if (this.add_state) {
        this.$emit("add_state_change");
      } else if (this.change_state) {
        this.$emit("edit");
      } else if (this.register_state) {
        this.$emit("register_state_change");
      } else if (this.chapter_state) {
        this.$emit("chapter_edit");
      }else if(this.add_chapter_state){
        this.$emit("add_chapter")
      }
    },
    async add(name) {
      await addSubject(name);
      this.cancle();
    },
    async edit(name) {
      await changeSubject(this.edit_text.id, name);
      this.cancle();
    },
    async register(name) {
      const res = await createUser(name);
      this.cancle();
    },
    async chapter_change_button(name) {
      const res = await changeChapter(this.chapter_edit_id, name);
      this.cancle();
      this.$emit("chapter_reload");
    },
    async add_chapter(name) {
      await addChapter(this.add_chapter_id, name);
      this.cancle();
      this.$emit("chapter_reload");
    }
  }
};
</script>
  
  <style scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.add {
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 5px;
}

input {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  outline: none;
}
</style>