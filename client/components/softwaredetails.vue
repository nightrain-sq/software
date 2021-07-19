软件详情
<template>
  <div v-if="software">
    <div class="software">
      <div class="software-details">
        <div class="software-details-navigation">
          <ul>
            <li>
              <a href="/">首页</a>
            </li>
            <li>\&nbsp;{{ software.category }}</li>
            <li>\&nbsp;{{ software.name }}</li>
          </ul>
        </div>
        <div class="software-details-information">
          <div class="software-image">
            <img :src="software.image">
          </div>
          <div class="software-info">
            <div class="software-name">{{ software.name }}</div>
            <ul class="software-version">
              <li>发布时间:&nbsp;{{ software.data }}&nbsp;&nbsp;</li>
              <li>大小:&nbsp;{{ software.size }}&nbsp;&nbsp;</li>
              <li>版本:&nbsp;{{ software.version }}&nbsp;&nbsp;</li>
            </ul>
            <ul class="software-support">
              <li>支持系统:&nbsp;{{ software.system }}&nbsp;&nbsp;</li>
              <li>支持位数:&nbsp;{{ software.digits }}位&nbsp;&nbsp;</li>
            </ul>
          </div>
          <div class="software-download">
            <a :href="software.link" @click="record">下载</a>
          </div>
        </div>
        <div class="software-details-introduction-box">
          <div class="software-details-introduction">
            <div class="introduction-title">软件简介</div>
            <br>
            <div class="introduction-content">{{ software.introduction }}</div>
            <br>
          </div>
        </div>
        <div class="software-website-link">
          官网链接:
          <a :href="software.website" target="_blank">{{ software.website }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import QS from "qs";
import moment from "moment";

export default {
  computed: {
    page() {
      return this.$store.state.page;
    },
    session() {
      return this.$store.state.session;
    }
  },
  data() {
    return {
      // 获取路由中的参数
      id: parseInt(this.$route.params.id), //使用路由params传参的时候
      software: null
    };
  },
  methods: {
    setSoftware() {
      let data = {
        num: this.page
      };
      axios
        .post("/listApi/list", QS.stringify(data))
        .then(response => {
          // console.log(response.data);
          this.software = response.data.find(item => item.id === this.id);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    record() {
      if (this.session === "") return;
      let time = moment().valueOf();
      let data = QS.stringify({
        username: this.session,
        softwareid: this.id,
        creattime: time
      });
      axios
        .post("/annalApi/calendar", data)
        .then(response => {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.setSoftware();
    this.$store.dispatch("getSession");
  }
};
</script>
<style scoped>
.software {
  width: 960px;
  margin: 0px auto;
}
.software-details {
  margin: 0 8px;
  background: #fff;
  overflow: hidden;
}
.software-details-navigation {
  margin-bottom: 20px;
}
.software-details-navigation li {
  display: inline;
  line-height: 40px;
  font-size: 14px;
}
.software-details-information {
  margin: 10px 0;
  width: 100%;
  overflow: hidden;
}
.software-image {
  width: 70px;
  height: 70px;
  float: left;
  text-align: center;
}
.software-image img {
  height: 100%;
}
.software-info {
  width: 500px;
  height: 100px;
  margin-left: 10px;
  display: block;
  float: left;
}
.software-name {
  font-size: 20px;
  font-weight: 600;
}
.software-version li,
.software-support li {
  display: inline;
  font-size: 14px;
}
.software-download {
  display: block;
  float: right;
  text-align: center;
  margin-right: 15px;
  width: 100px;
  height: 40px;
  line-height: 40px;
}
.software-download > a:hover {
  background-color: rgb(255, 123, 0);
}
.software-download a {
  padding: 5px 30px;
  font-size: 20px;
  color: #fff;
  background: #42af17;
}
.software-details-introduction-box {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  font-size: 14px;
}
.introduction-title {
  font-size: 16px;
  font-weight: 600;
}
.introduction-content {
  font-size: 14px;
}
.software-website-link {
  font-size: 14px;
}
</style>