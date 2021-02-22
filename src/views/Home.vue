<template>
  <div>
    <el-container class="home-container">
      <!-- 导航栏 -->
      <el-header class="nav">
        <el-menu
          active-text-color="#F56C6C"
          mode="horizontal"
          router
          default-active="exchange"
          @select="handleSelect"
          background-color="#ffffff"
        >
          <el-menu-item index="exchange">闲置交易</el-menu-item>
          <el-menu-item index="biaobai">表白墙</el-menu-item>
          <el-menu-item index="picwall">图片墙</el-menu-item>
          <el-menu-item index="moive">电影</el-menu-item>
          <el-menu-item>{{ time123 }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边栏side -->
        <el-aside width="300px">
          <!-- 咸鱼开始 -->
          <transition name="el-fade-in-linear">
            <div  class="exchange" v-if="activeSideKey == 'exchange'" key="show1">
              <!-- 选择框 -->
              <div class="radio">
                <el-radio-group
                  size="small"
                  v-model="selectedCate"
                  @change="radiochange"
                >
                  <el-radio-button label="手机"></el-radio-button>
                  <el-radio-button label="电脑"></el-radio-button>
                  <el-radio-button label="平板"></el-radio-button>
                  <el-radio-button label="男装"></el-radio-button>
                  <el-radio-button label="女装"></el-radio-button>
                  <el-radio-button label="化妆"></el-radio-button>
                  <el-radio-button label="书籍"></el-radio-button>
                  <el-radio-button label="宿舍"></el-radio-button>
                  <el-radio-button label="其他"></el-radio-button>
                  <!-- <el-radio-button label="其他"></el-radio-button> -->
                </el-radio-group>
              </div>
              <!-- 咸鱼 输入框 -->
              <el-input
                class="exchangeinput"
                v-model="exchange.exchangeContent"
                placeholder="发布闲置，记得留下联系方式！"
                type="textarea"
                :rows="25"
                size="normal"
                clearable
                @change=""
              ></el-input>
              <!-- 咸鱼上传按钮 -->
              <el-row>
                <el-col :offset="17" :span="3">
                  <el-popconfirm
                    @confirm="exchangeUpload"
                    title="确定要发布在这个分类咯?"
                  >
                    <el-button slot="reference">发布</el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </div>
          </transition>
          <!-- 咸鱼结束 -->

          <!-- 表白墙side开始 -->
          <transition name="el-fade-in-linear">
            <div v-if="activeSideKey == 'biaobai'"  key="show2">
              <!-- 表白墙输入框 -->
              <el-input
                class="biaobaiinput"
                type="textarea"
                :rows="30"
                v-model="biaobai.biaobaiContent"
                placeholder="「今天，你遇到TA了吗」"
              >
              </el-input>
              <!-- 表白墙上传按钮 -->
              <el-row>
                <el-col :offset="18" :span="3">
                  <el-button class="uploadButton" @click="biaobaiUpload">
                    <i class="el-icon-right"></i
                  ></el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <!-- 表白墙side结束 -->

          <div class="admin" @click="IsadminLogin"></div>
        </el-aside>
        <el-main>
          <!-- router-view 利用v-if刷新 -->
          <transition name="el-fade-in" mode="out-in">
            <router-view v-if="isRouterAlive"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <!-- 管理员登录框 -->
    <el-dialog
      :visible.sync="adminLoginDialogFlag"
      width="30%"
      @close="adminLoginDialogClose()"
    >
      <span>
        <el-input
          v-model="adminLoginInput"
          show-password
          placeholder="管理员密码"
          size="normal"
          clearable
          @change=""
        ></el-input>
      </span>
      <span slot="footer">
        <el-button @click="adminLoginDialogClose()">Cancel</el-button>
        <el-button @click="adminLogin()">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      adminLoginInput: "",
      adminFlag: false,
      admincount: 5,

      selectedCate: "手机",
      isRouterAlive: true,
      activeSideKey: "",
      exchange: {
        exchangeContent: "",
        cate: "",
        time: "",
      },
      biaobai: {
        biaobaiContent: "",
        time: "",
      },
      time123: "",
    };
  },
  computed: {
    adminLoginDialogFlag() {
      if (this.admincount == 0) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    // 表白墙上传按钮
    biaobaiUpload() {
      if (this.biaobai.biaobaiContent.length < 10) {
        this.$message({
          message: "多说些什么吧",
          type: "error",
        });
        return;
      }
      this.biaobai.time = this.time123.slice(0, 17);

      var data = Qs.stringify(this.biaobai);

      axios
        .post("http://localhost:3000/addbiaobai", data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.isRouterAlive = false;
          this.$nextTick(() => {
            this.isRouterAlive = true;
            this.biaobai.biaobaiContent = "";
          });
        });
    },
    // 咸鱼上传按钮
    exchangeUpload() {
      if (this.exchange.exchangeContent.length < 10) {
        this.$message({
          message: "多说些什么吧",
          type: "error",
        });
        return;
      }
      this.exchange.time = this.time123.slice(0, 17);
      this.exchange.cate = this.selectedCate;

      var data = Qs.stringify(this.exchange);

      axios
        .post("http://localhost:3000/addexchange", data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          // console.log(res);
          this.isRouterAlive = false;
          this.$nextTick(() => {
            this.isRouterAlive = true;
            this.exchange.exchangeContent = "";
          });
        });
    },
    // 咸鱼切换分类
    radiochange() {
      this.$store.state.selectedCate = this.selectedCate;
      // console.log(this.$store.state.selectedCate);
    },

    // 导航栏选择
    handleSelect(key) {
      this.activeSideKey='space'
     
      setTimeout(()=>{
             this.activeSideKey = key;
      },200)

    //  this.activeSideKey = key;
 
    
    },
    // 时间
    currentTime() {
      setInterval(this.getTime, 500);
    },
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.time123 =
        yy + "年 " + mm + "月" + dd + "日 " + hh + ":" + mf + ":" + ss;
    },
    // 倒数管理员登陆
    IsadminLogin() {
      this.admincount--;
    },
    // 管理员登录窗关闭
    adminLoginDialogClose() {
      this.admincount = 5;
      this.adminLoginInput = "";
    },
    // 管理员身份确认
    adminLogin() {
      if (this.adminLoginInput == "sc1998sc") {
        this.adminFlag = true;
        this.admincount = 5;
        this.$store.state.adminFlag = this.adminFlag;
      } else {
        this.$message({
          message: "?",
          type: "error",
        });
      }
    },
  },
  created() {
    // 获取时间
    this.currentTime();
  },
};
</script>
<style  scoped>
.home-container {
  height: 100vh;
  width: 85vw;
  margin: 0 auto;
}
.el-container {
  background-color: rgba(179, 194, 199, 0.096);
}

.biaobaiinput {
  width: 250px;
  margin: 28px 20px 20px 30px;
  resize: none;
}
.exchange {
  width: 260px;
  margin: 30px 0 0 30px;
}
.radio {
  margin: 0 0 0 15px;
}
.exchangeinput {
  margin: 30px 0;
  resize: none;
}
.nav {
  background-color: rgb(255, 255, 255);
}
.admin {
  height: 30px;
  width: 30px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: #ffffff00;
}

.el-aside {
  height: 93vh;
}

.el-fade-in-linear-enter-active {
  transition: all 0.5s;
}
.el-fade-in-linear-leave-active {
  transition: all 0.2s;
}
.el-fade-in-linear-enter,
.el-fade-in-linear-leave-active {
  opacity: 0;
}


.el-fade-in-enter-active {
  transition: all 0.6s;
}
.el-fade-in-leave-active {
  transition: all 0.2s;
}
.el-fade-in-enter,
.el-fade-in-leave-active {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>