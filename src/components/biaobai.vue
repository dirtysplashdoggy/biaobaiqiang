<template>

    <div class="biaobai">
      <el-row>
        <el-col
          :span="8"
          v-for="item in reverseText.slice(
            (this.currentPage - 1) * 9,
            this.currentPage * 9
          )"
        >
          <el-card shadow="hover">
            <div slot="header">
              <span class="time"> {{ item.time }}</span>
              <!-- 小X 删除按钮 通过Home操作的flag来显示 -->
              <i
                v-show="$store.state.adminFlag == true"
                @click="biaobaiDelete(item.id)"
                class="el-icon-circle-close"
              ></i>
            </div>
            <div class="content">{{ item.content }}</div>
          </el-card>
        </el-col>
      </el-row>

      <el-pagination
        :page-size="9"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next,jumper"
        :total="reverseText.length"
      >
      </el-pagination>
    </div>

</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      text: [],
      currentPage: 1,
    };
  },

  methods: {
    // 删除操作
    biaobaiDelete(id) {
      var idData = {
        id: id,
      };
      var data = Qs.stringify(idData);

      axios.post("http://localhost:3000/deletebiaobai", data).then((res) => {
        //  console.log(res)
        this.getContent();
      });
    },
    // 请求数据
    getContent() {
      axios.get("biaobai").then((res) => {
        // console.log(res);
        this.text = res.data.data;
      });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },

  created() {
    this.getContent();
  },
  computed: {
    reverseText() {
      return this.text.reverse();
    },
  },
};
</script>
<style  scoped>
.el-card {
  margin: 8px;
  height: 250px;
  overflow: auto;
}
.el-pagination {
  margin: 3vh 0 0 17vw;
}
.time {
  font-family: monospace;
  margin: 0 0 0 95px;
}
.el-icon-circle-close {
  position: relative;
  left: 90px;
  color: #f56c6c;
}
</style>