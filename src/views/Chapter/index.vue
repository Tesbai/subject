<template>
  <div class="chapter_container cf">
    <div class="chapter_left">
      <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="chapter_right">
      <div>
        <el-date-picker v-model="start_date" type="date" placeholder="选择日期" class="start_date"></el-date-picker>
        <el-date-picker v-model="end_date" type="date" placeholder="选择日期" class="end_date"></el-date-picker>
        <el-button @click="find_chapter">查询</el-button>
        <el-button>重置</el-button>
      </div>
      <el-button type="primary" class="add_button" @click="add_chapter">新增章节</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号" width="90" align="center"></el-table-column>
        <el-table-column prop="name" label="课程名" align="center"></el-table-column>
        <el-table-column label="创建日期" width="300" align="center">
          <template #default="{ row }">
            <p>{{ new Date(row.create_time).toLocaleString() }}</p>
          </template>
        </el-table-column>
        <el-table-column label="更新日期" width="300" align="center">
          <template #default="{ row }">
            <p>{{ new Date(row.update_time).toLocaleString() }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" round @click="edit(scope.row.id, scope.row.name)">编辑</el-button>
            <el-button type="danger" round @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Bullet
      v-if="chapter_state || add_chapter_state"
      :title="title"
      :chapter_state="chapter_state"
      :add_chapter_state="add_chapter_state"
      :chapter_edit_id="edit_id"
      :add_chapter_id="current_subject_id"
      @chapter_edit="edit"
      @chapter_reload="reload"
      @add_chapter="add_chapter"
    >
      <template v-slot:confirm_changeChapter>
        <div>确认修改</div>
      </template>
      <template v-slot:confirm_addChapter>
        <div>确认添加</div>
      </template>
    </Bullet>
  </div>
</template>

<script>
import { getSubject } from "@/api/subject";
import { getChapter, deleteChapter } from "@/api/chapter";
import Bullet from "@/views/Bullet";
export default {
  data() {
    return {
      start_date: null,
      end_date: null,
      data: [],
      tableData: [],
      chapter_state: false,
      add_chapter_state:false,
      current_subject_id: Number,
      edit_id: Number,
      title: "章节名称"
    };
  },
  components: {
    Bullet
  },
  async created() {
    let list = this.$store.state.subject.list;
    if (!list) {
      const res = await getSubject(this.$store.state.token);
      this.$store.commit("subject/writeList", res.data.data);
      list = res.data.data;
    }
    list.forEach(item => {
      this.data.push({
        label: item.name,
        id: item.id
      });
    });
    this.current_subject_id = this.data[0].id
    const res = await getChapter(this.data[0].id);
    this.$store.commit("chapter/writeChapter", res.data.data);
    this.tableData = res.data.data;
  },
  methods: {
    async handleNodeClick(data) {
      const res = await getChapter(data.id);
      this.$store.commit("chapter/writeChapter", res.data.data);
      this.current_subject_id = data.id;
      this.tableData = res.data.data;
    },
    edit(id, name) {
      this.edit_id = id;
      this.chapter_state = !this.chapter_state;
    },
    async reload() {
      const res = await getChapter(this.current_subject_id);
      this.tableData = res.data.data;
    },
    find_chapter() {
      let start_time = new Date(this.start_date).getDate();
      let end_time = new Date(this.end_date).getDate();
      this.tableData = this.$store.state.chapter.chapter_list.filter(item => {
        let create_time = new Date(item.update_time).getDate();
        if(create_time >= start_time && create_time <= end_time){
          return true;
        }
      })
    },
    async del(id) {
      const res = await deleteChapter(id)
      if(res.data.status == 'error'){
        this.$message.error('删除子文件之后再进行此操作');
      }
      this.reload();
    },
    add_chapter(){
      this.add_chapter_state = !this.add_chapter_state
      this.reload();
    }
  }
};
</script>


<style scoped>
.chapter_container {
  display: flex;
  height: 100%;
}

.chapter_left {
  width: 20%;
  height: 100%;
  border-right: 1px solid #000;
  box-sizing: border-box;
  padding: 20px;
  overflow-y: auto;
}

.chapter_left::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.3);
}
.chapter_left::-webkit-scrollbar {
  display: none;
  width: 5px;
  height: 5px;
}
.chapter_left::-webkit-scrollbar-track {
  background-color: #fff;
}

.chapter_right {
  width: 80%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.el-main {
  padding: 0;
}

.start_date,
.end_date {
  margin-right: 20px;
}

.add_button {
  margin-top: 10px;
}
</style>