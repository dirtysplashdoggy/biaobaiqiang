<!--  -->
<template>
  <div>
    <el-button type="warning" @click="postdata()"></el-button>

  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      exchange: {
        content: "测试post",
        time: "2021-02-20 14:25:02",
      },

    };
  },

  methods: {
    postdata() {
      var data = Qs.stringify(this.exchange);

      axios
        .post("http://localhost:3000/addbiaobai", data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>