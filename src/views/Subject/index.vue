<template>
  <div>
    <div>
      <el-date-picker v-model="start_date" type="date" placeholder="选择日期" class="start_date"></el-date-picker>
      <el-date-picker v-model="end_date" type="date" placeholder="选择日期" class="end_date"></el-date-picker>
      <el-button @click="search_data">查询</el-button>
      <el-button @click="reset_data">重置</el-button>
    </div>
    <el-button type="primary" @click="add_state_change" class="add_button">新增课程</el-button>
    <Bullet
      v-if="add_state || change_state"
      @add_state_change="add_state_change"
      @edit="edit"
      @get_subject="get_subject"
      :add_state="add_state"
      :change_state="change_state"
      :edit_text="edit_text"
      :title="title"
    >
      <template v-slot:confirm_add>
        <div>确认添加</div>
      </template>
      <template v-slot:confirm_change>
        <div>确认修改</div>
      </template>
    </Bullet>
    <el-table :data="page_list" style="width: 100%">
      <el-table-column prop="id" label="编号" width="90" align="center"></el-table-column>
      <el-table-column prop="name" label="课程名" align="center"></el-table-column>
      <el-table-column label="创建日期" width="200" align="center">
        <template #default="{ row }">
          <p>{{ new Date(row.create_time).toLocaleString() }}</p>
        </template>
      </el-table-column>
      <el-table-column label="更新日期" width="200" align="center">
        <template #default="{ row }">
          <p>{{ new Date(row.update_time).toLocaleString() }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" round @click="edit(scope.row.id, scope.row.name)">编辑</el-button>
          <el-button type="danger" round @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="custom_page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="page_sizes"
        :page-size="page_sizes[0]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Bullet from "@/views/Bullet";
import { getSubject, delSubject } from "@/api/subject";
import Vue from "vue";
export default {
  data() {
    return {
      add_state: false,
      change_state: false,
      edit_text: {
        id: Number,
        name: ""
      },
      list: [],
      page_list: [],
      start_date: null,
      end_date: null,
      currentPage: 1,
      page_size: 4,
      page_sizes: [4, 6, 8, 10],
      title:'课程'
    };
  },
  created() {
    this.get_subject();
  },
  components: {
    Bullet
  },
  methods: {
    add_state_change() {
      this.add_state = !this.add_state;
      if (this.add_state == false) {
        Vue.nextTick(() => {
          this.get_subject();
        });
      }
    },
    async get_subject(currentPage = 1) {
      const {
        data: { data }
      } = await getSubject();
      this.list = data;
      this.$store.commit("subject/writeList", data);
      this.page_list = this.list;
      this.page_list = this.list.slice(
        (currentPage - 1) * 4,
        this.page_size * currentPage
      );
    },
    async edit(id, name) {
      this.edit_text.id = id;
      this.edit_text.name = name;
      this.change_state = !this.change_state;
      this.get_subject(this.currentPage);
    },
    async del(id) {
      const res = await delSubject(id);
      if(res.data.status == 'error'){
        this.$message.error('删除子文件之后再进行此操作');
      }
      if (this.page_list.length == 1) {
        this.currentPage--;
      }
      this.get_subject(this.currentPage);
    },
    search_data() {
      let start_time = new Date(this.start_date).getTime();
      let end_time = new Date(this.end_date).getTime();
      let search_list = this.$store.state.subject.list.filter(item => {
        let create = new Date(item.create_time).getTime();
        if (create >= start_time && create <= end_time) {
          return true;
        }
      });
      this.list = search_list;
      this.page_list = this.list.filter((item, index) => {
        if (index < this.page_size) {
          return true;
        }
      });
    },
    reset_data() {
      this.list = this.$store.state.subject.list;
      this.currentPage = 1;
      this.page_list = this.list.slice(0, this.page_size);
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.page_list = this.list.slice(0, val);
      this.page_size = val;
    },
    handleCurrentChange(val) {
      this.page_list = this.list.slice(
        (val - 1) * this.page_size,
        val * this.page_size
      );
      this.currentPage = val;
    }
  }
};
</script>

<style>
.start_date,
.end_date {
  margin-right: 20px;
}

.add_button {
  margin-top: 10px;
}

.custom_page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>