// 软件简介
<template>
  <div class="list">
    <div class="software-main" :title="info.name">
      <router-link :to="'/softwaredetails/' + info.id">
        <div class="box-img">
          <img :src="info.image">
        </div>
        <h4>{{ info.name }}</h4>
      </router-link>
      <a :href="info.link" class="software-download" @click="record">马上下载</a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import QS from "qs";
import moment from "moment";

export default {
  computed: {
    session() {
      return this.$store.state.session;
    }
  },
  props: {
    info: Object
  },
  methods: {
    record() {
      if (this.session === "") return;
      let time = moment().valueOf();
      let data = QS.stringify({
        username: this.session,
        softwareid: this.info.id,
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
  }
};
</script>
<style scoped>
.list {
  width: 14.286%;
  float: left;
  overflow: auto;
}
.software-main {
  display: block;
  margin: 0px 8px 16px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
}
.box-img {
  width: 70px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
}
.box-img img {
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
h4 {
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记（...） */
  white-space: nowrap; /* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止 */
}
h4:hover {
  color: rgb(0, 17, 255);
}
.software-download {
  display: none;
  padding: 0px 8px;
  background: rgb(99, 202, 122);
  color: rgb(235, 49, 74);
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 102px;
  left: 27px;
}
.software-main:hover .software-download {
  display: inline-block; /* 当鼠标移到.software-main上，.software-downloaddisplay属性变为inline-block */
}
</style>