// 软件列表
<template>
  <div class="container">
    <div class="list-select">
      <!-- 过滤 -->
      <div class="list-select-filter">
        <span>热门分类：</span>
        <!-- 使用v-for输出所有软件的类型 -->
        <span
          class="list-select-filter-item"
          :class="{on: item === filterCategory}"
          v-for="(item,index) in categorys"
          :key="index"
          @click="handleFilterCategory(item)"
        >{{ item }}</span>
        <!-- 通过点击事件的handleFilterBrand方法改变filterBrand的值 -->
      </div>
    </div>
    <div class="software-list">
      <Software v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Software>
    </div>
    <div class="load-more">
      <a href="javascript:;" v-if="load" class="loadMore" @click.prevent="loadMore">点击加载更多</a>
      <span class="noMore" v-else>没有更多了!</span>
    </div>
    <div class="software-not-found" v-show="!filteredAndOrderedList.length">暂无相关软件</div>
  </div>
</template>
<script>
import Software from "./introduction.vue"; //软件列表中导入软件简介
export default {
  components: {
    Software
  },
  computed: {
    list() {
      //从Vuex获取软件列表数据
      return this.$store.state.list;
    },
    categorys() {
      //从Vuex获取软件的所有类型
      return this.$store.getters.categorys;
    },
    load() {
      return this.$store.state.load;
    },
    filteredAndOrderedList() {
      let list = [...this.list]; //相当于克隆了一份数据
      // 按类别过滤
      if (this.filterCategory !== "") {
        list = list.filter(item => item.category === this.filterCategory);
      }
      return list;
    }
  },
  data() {
    return {
      filterCategory: ""
    };
  },
  methods: {
    handleFilterCategory(category) {
      if (this.filterCategory === category) {
        this.filterCategory = "";
      } else {
        this.filterCategory = category;
      }
    },
    loadMore() {
      this.$store.commit("getMore");
      this.$store.dispatch("getSoftwareList");
    }
  },
  mounted() {
    this.$store.dispatch("getSoftwareList");
    this.$store.dispatch("getSession");
  }
};
</script>
<style scoped>
.container {
  width: 960px;
  margin: 0px auto;
}
.list-select {
  margin: 0px 8px;
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.list-select-filter-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 5px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-select-filter-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.software-list {
  overflow: hidden;
}
.load-more {
  display: block;
  position: relative;
  text-align: center;
  margin: 0px auto;
  width: 944px;
  height: 40px;
  background-color: #f2352e;
}
.loadMore {
  line-height: 40px;
  font-size: 14px;
  color: rgb(255, 255, 255);
}
.loadMore:hover {
  color: rgb(23, 114, 252);
}
.noMore {
  line-height: 40px;
  font-size: 14px;
  color: rgb(0, 0, 0);
}
.software-not-found {
  text-align: center;
  padding: 32px;
}
</style>