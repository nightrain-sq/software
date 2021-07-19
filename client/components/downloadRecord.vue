<template>
  <div class="history">
    <div class="history-details">
      <div class="history-navigation">
        <ul>
          <li><a href="/">首页</a></li>
          <li>\&nbsp;下载历史</li>
        </ul>
      </div>
      <div class="history-content" v-for="(item, index) in historyDictList" :key="item.id">
        <div class="history-image">
              <img :src="softwareDictList[item.software_id].image">
        </div>
        <div class="history-information">
          <ul>
            <li>&nbsp;{{ softwareDictList[item.software_id].name }}&nbsp;&nbsp;</li>
            <li>&nbsp;{{ softwareDictList[item.software_id].size }}&nbsp;&nbsp;</li>
            <li>&nbsp;{{ item.creat_time | formatDate }}&nbsp;&nbsp;</li>
          </ul>
          <ul>
            <li>官网链接:
              <a :href="softwareDictList[item.software_id].website" target="_blank">{{ softwareDictList[item.software_id].website }}</a>
            </li>
          </ul>
        </div>
        <div class="history-download">
          <a :href="softwareDictList[item.software_id].link" @click="record(item.software_id)">下载</a>
        </div>
        <div class="history-delete">
          <a href="javascript:;" @click.prevent="handleDelete(index)">删除</a>
        </div>
      </div>
      <div class="history-empty" v-if="!historyList.length">下载历史为空</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import QS from 'qs';
  import moment from 'moment';
  
  export default {
    computed: {
       session() {
        return this.$store.state.session;
      },
      softwareDictList() {
        const dict = {};
        this.softwareList.forEach(item => {
          dict[item.id] = item;
        })
        return dict
      },
      //历史记录按时间排序
      historyDictList() {
        return this.historyList.sort((a,b) => {
          let aTime = a.creat_time
          let bTime = b.creat_time
          return bTime - aTime
        })
      }
    },
    data() {
      return {
        softwareList: [],
        historyList:[]
      }
    },
    methods: {
      getSoftware() {
        axios.post('/listApi/allList')
        .then((response) => {
          this.softwareList = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      getHistory() {
        if(this.session === '') return;
        let data =  QS.stringify({
          username : this.session
        })
        axios.post('/annalApi/userNotes', data)
        .then((response) => {
          this.historyList = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      handleDelete(index) {
        let data =  QS.stringify({
          historyId : this.historyList[index].id,
        })
        axios.post('/annalApi/del', data)
        .then((response)=>{
          this.getHistory();
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      record(recordid) {
        let time = (moment().valueOf());
        let data =  QS.stringify({
            username : this.session,
            softwareid : recordid,
            creattime : time
        })
        axios.post('/annalApi/calendar', data)
        .then((response)=>{
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
      }
    },
    watch: {
      session() {
        if(this.session === '') return;
        this.getHistory();
      }
    },
    mounted() {
      this.$store.dispatch('getSession');
      this.getSoftware();
      this.getHistory();
    }
  }
</script>
<style scoped>
  .history{
    width: 960px;
    margin: 0px auto;
    padding-bottom: 117px;
  }
  .history-details{
    margin: 0 8px;
    background: #fff;
    overflow: hidden;
  }
  .history-navigation{
    margin-bottom: 20px;
  }
  .history-navigation li{
    display:inline;
    line-height: 40px;
    font-size: 14px;
  }
  .history-content{
    margin: 5px 0;
    border-bottom: 1px dashed #e9eaec;
    overflow: hidden;
  }
  .history-image{
    width: 60px;
    height: 60px;
    float: left;
    text-align: center;
  }
  .history-image img{
    height: 100%;
  }
  .history-information{
    width: 600px;
    height: 70px;
    margin-left: 10px;
    padding-top: 10px;
    display: block;
    float: left;
  }
  .history-information li{
    display: inline;
    font-size: 14px;
  }
  .history-download,
  .history-delete{
    display: block;
    float: right;
    text-align: center;
    margin-right: 15px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }
  .history-download{
    margin-right: 0px;
  }
  .history-download a,
  .history-delete a{
    padding: 5px 30px;
    font-size: 18px;
    color: #fff;
    background: #42af17;
  }
  .history-delete a{
    background: rgb(255, 123, 0)
  }
  .history-download a:hover{
    color: rgb(255, 123, 0);
  }
  .history-delete a:hover{
    color: #c01717;
  }
  .history-empty{
    margin-top: 130px;
    text-align: center;
    padding: 32px;
  }
</style>