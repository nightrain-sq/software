import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import QS from 'qs';
// import moment  from 'moment';
import Routers from './router/router.js';
import App from './app.vue';
import './style.css';
import '../iconfont/iconfont.css';

// 引入iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Vuex);

// 全局axios默认值
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

// 数组去重
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

const store = new Vuex.Store({
    state: {
        softwareList: [],
        // list作为softwarelist数组的备份用于关键字搜索
        list: [],
        session:'',
        page: 1,
        load: true,
    },
    getters: {
        //使用map方法把productList里的categorys数据过滤出来
        //调用getFilterArray方法对数组去重（以获得所有的类型）
        categorys: state => {
            const categorys = state.softwareList.map(item => item.category);
            return getFilterArray(categorys);
        }
    },
    mutations: {
        // 添加商品列表
        setSoftwareList (state, data) {
            state.softwareList = state.softwareList.concat(data);
            state.list = state.softwareList;
            if(data.length < 35){
                state.load = false;
            }
        },
        //关键字搜索（不区分大小写）
        filterSerach (state,word) {
            if (word == '') {
                state.list = state.softwareList;
            } else {
                state.list = state.softwareList.filter(item =>{
                    if (item.name.toLowerCase().includes(word.toLowerCase())) {
                        return item;
                    }
                })
            }
        },
        setSession (state,data) {
            state.session = data; 
        },
        resetSoftwareList (state) {
            state.softwareList = [];
        },
        logout (state) {
            state.session = '';
        },
        getMore (state) {
            state.page++;
        },
        backtotop () {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    },
    actions: {
        // 请求软件列表
        getSoftwareList (context) {
            let data = {
                num : this.state.page
            }
            axios.post('/listApi/list', QS.stringify(data))
            .then((response) => {
                context.commit('setSoftwareList', response.data);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        getSession (context) {
            axios.get('/loginApi/session')
            .then((response) => {
                context.commit('setSession',response.data);
            })
        },
    }
});
// 全局定义时间过滤器
Vue.filter('formatDate',function(value){
    //当前时间戳
    var nowdate = new Date();
    var now = nowdate.getTime();
    //今天凌晨零点时间戳
    var todaydate = new Date();
    todaydate.setHours(0);
    todaydate.setMinutes(0);
    todaydate.setSeconds(0);
    todaydate.setMilliseconds(0);
    var today = todaydate.getTime();

    // 转为秒级
    var timer = (now - value) / 1000;
    if(timer <= 0) {
        return "刚刚";
    }else if(Math.floor(timer/60) <= 0) {
        return "刚刚";
    }else if(timer < 3600) {
        return Math.floor(timer/60) + '分钟前';
    }else if(timer >= 3600 && (value - today >= 0)) {
        return Math.floor(timer/3600) + '小时前';
    }else if(timer/86400 <= 31) {
        return Math.ceil(timer/86400) + '天前';
    }else{
        let Ldate = new Date(value) ;
        let Lmonth = Ldate.getMonth() + 1 < 10 ? '0' + (Ldate.getMonth() + 1) : Ldate.getMonth() + 1;
        let Lday = Ldate.getDate() < 10 ? '0' + Ldate.getDate() : Ldate.getDate();
        return Ldate.getFullYear() + '-' + Lmonth + '-' +Lday;
    }
    // var date = new Date(value);
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    // var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});