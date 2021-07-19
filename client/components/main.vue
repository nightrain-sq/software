<template>
  <div>
    <div class="header">
      <div class="header-item">
        <a class="header-title" href="/" title="首页">douxing 软件下载</a>
        <a class="header-home" href="/" title="首页">首页</a>
        <div class="header-search">
          <label>
            <input
              type="text"
              class="search"
              placeholder="查找您需要的软件！"
              v-model="keyword"
              @keyup.enter="search"
            >
            <input type="button" value="搜索" class="btn" @click="search">
          </label>
        </div>
        <router-link to="/loginRegister" class="login-reister" v-if="!session">登录/注册</router-link>
        <div v-if="session" class="user">
          用户:
          <span style="color:red">{{ session }}</span>
          <!-- <a href="javascript:;" @click.prevent="logout">退出</a> -->
          <div class="dropdown">
            <i class="iconfont icon-iconfontarrowdown"></i>
            <div class="dropdown-content">
              <a href="javascript:;" @click.prevent="logout">退出登录</a>
              <router-link to="/downloadRecord">下载历史</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
      <!-- 路由视图<router-view>来挂载所有的路由组件 -->
    </div>
    <div class="footer" id="footer">
      <div class="footer-item">
        <p>待添加</p>
        <br>
        <p>xxxxxxxxxxxxxxxxxxxxxx</p>
      </div>
    </div>
    <div class="back-to-top">
      <a href="javascript:;" class="scrollup" @click.prevent="backtop">
        <i class="iconfont icon-icon12"></i>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  computed: {
    session() {
      return this.$store.state.session;
    }
  },
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    reset() {
      this.$store.dispatch("getSoftwareList");
    },
    search() {
      this.$store.commit("filterSerach", this.keyword);
    },
    backtop() {
      this.$store.commit("backtotop");
    },
    logout() {
      axios
        .get("/loginApi/logout")
        .then(res => {
          window.location.href = "/";
          window.alert("退出登录成功！");
          this.$store.commit("logout");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.header {
  height: 80px;
  width: 100%;
  background: rgb(255, 188, 126);
  margin-bottom: 20px;
}
.header-item {
  display: block;
  width: 960px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  line-height: 80px;
}
.header-title {
  margin: 0 8px;
  float: left;
  font-size: 26px;
  color: rgb(0, 0, 0);
}
.header-home {
  margin: 0 20px;
  float: left;
  font-size: 16px;
  color: #a71e1e;
}
.login-reister {
  float: right;
  margin: 0 8px;
  font-size: 14px;
  color: rgb(167, 30, 30);
}
.user {
  float: right;
  margin-left: 8px;
  color: rgb(0, 0, 0);
}
.dropdown {
  position: relative;
  width: 30px;
  text-align: center;
  display: inline-block;
}
.dropdown > i {
  cursor: pointer;
  position: relative;
  font-weight: bold;
  font-size: 18px;
  filter: alpha(opacity=30); /*滤镜*/
  width: 25px;
  text-align: center;
  line-height: 25px;
}
.dropdown-content {
  text-align: center;
  font-size: 14px;
  z-index: 999;
  line-height: 25px;
  display: none;
  right: 0;
  position: absolute;
  background-color: #f8a168;
  min-width: 100px;
}
.dropdown-content a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  display: block;
}
.dropdown:hover {
  color: #f8a168;
}
.dropdown-content a:hover {
  background-color: #d38770;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.header-search {
  float: right;
  margin: 0 8px;
  position: relative;
}
.search {
  border: 2px solid rgb(53, 64, 218);
  border-radius: 5px;
  outline: none;
  padding: 0 12px;
  max-width: 300px;
  height: 30px;
  line-height: 30px;
}
.btn {
  position: relative;
  line-height: 16px;
  top: 1px;
  background-color: rgb(76, 122, 175);
  border-radius: 2px;
  border: none;
  outline: none;
  color: white;
  padding: 7px 3px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}
.btn:active {
  top: 3px;
  left: 1px;
}
.main {
  /* min-height: 76.5%; */
  /*设置子元素伸缩项目的伸缩比例*/
  -webkit-flex: 1; /*新版本：Chrome*/
  flex: 1; /*标准规范：Opera 12.1, Firefox 20+*/
  /* margin-bottom: 150px; */
}
.footer {
  padding-top: 50px;
  position: relative; /*有滚动条时候为relative 没有滚动条的时候为fixed*/
  bottom: 0px;
  width: 100%;
  /* background-color: rgb(231, 231, 231); */
  overflow: hidden;
}
.footer-item {
  width: 960px;
  text-align: center;
  margin: 0 auto;
  padding: 5px 4px;
  height: 100px;
  font-size: 2em;
  line-height: 1em;
  color: red;
}
.scrollup {
  position: fixed;
  right: 0;
  bottom: 100px;
}
.scrollup > i {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  background: rgb(45, 45, 45);
  opacity: 0.4; /*透明度*/
  filter: alpha(opacity=30); /*滤镜*/
  width: 25px;
  text-align: center;
  line-height: 25px;
}
</style>
