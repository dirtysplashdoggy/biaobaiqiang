<template>
  <div>
    <el-row>
      <el-col
        :span="8"
        v-for="item in catedText.slice(
          (this.currentPage - 1) * 9,
          this.currentPage * 9
        )"
      >
        <transition-group name="el-fade-in-linear">
          <el-card shadow="hover" key="item.id">
            <div slot="header">
              <span class="time">
                {{ item.time }}
                <i
                  v-show="$store.state.adminFlag == true"
                  @click="exchangeDelete(item.id)"
                  class="el-icon-circle-close"
                ></i>
              </span>
            </div>
            <div class="content">{{ item.content }}</div>
          </el-card>
        </transition-group>
      </el-col>
    </el-row>

    <el-pagination
      :page-size="9"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next,jumper"
      :total="catedText.length"
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
    exchangeDelete(id) {
      var idData = {
        id: id,
      };
      var data = Qs.stringify(idData);

      axios.post("http://localhost:3000/deleteExchange", data).then((res) => {
        //  console.log(res)
        this.getContent();
      });
    },

    getContent() {
      axios.get("exchange").then((res) => {
        // console.log(res.data.data);
        this.text = res.data.data;
        // console.log(this.text);
      });
    },

    handleCurrentChange(val) {
      this.currentPage = val;

      console.log(this.catedText);
    },
  },

  created() {
    this.getContent();
  },
  computed: {
    cate() {
      return this.$store.state.selectedCate;
    },

    reverseText() {
      return this.text.reverse();
    },
    catedText() {
      return this.reverseText.filter((item) => {
        if (item.cate == this.cate) {
          return item;
        }
      });
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