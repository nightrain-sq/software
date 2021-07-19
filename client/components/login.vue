// 登录注册
<template>
  <div class="wrap">
    <div class="login-wrap" v-show="showLogin">
      <h1>登录</h1>
        <p v-show="showPrompt">{{prompt}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
        <button @click="login">登录</button>
        <span @click="toRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h1>注册</h1>
      <p v-show="showPrompt">{{prompt}}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword"  @keyup.enter="register">
      <button @click="register">注册</button>
      <span @click="toLogin">已有账号？马上登录</span>
    </div>
    <a href="/">返回首页</a>
  </div>
</template>
<script>
  import axios from 'axios';
  import QS from 'qs';

  export default{
    data(){
      return{
        showLogin: true,
        showRegister: false,
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    },
    methods:{
      toRegister(){
        this.showLogin = false;
        this.showRegister = true;
      },
      toLogin(){
        this.showRegister = false;
        this.showLogin = true;
      },
      login () {
        if(this.username == ""){
          window.alert("请输入用户名");
        }else if(this.password == ""){
          window.alert("请输入密码");
        }else{
          let data =  QS.stringify({
            username : this.username,
            password : this.password
          })
          /*接口请求*/
          axios.post('/loginApi/login', data)
          .then((res)=>{
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if(res.data == -1){
              window.alert('该用户不存在')
            }else if(res.data == 0){
              window.alert('密码输入错误')
            }else if(res.data == 'ok'){
            /*路由跳转this.$router.push*/
              this.$router.push('/main');
              this.$store.commit('resetSoftwareList');
              window.alert('登录成功！');
            }else{
              window.alert('请重试！')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      register(){
        if(this.newUsername == ""){
          window.alert("请输入用户名")
        }else if(this.newPassword == ""){
          window.alert("请输入密码")
        }else{
          let data =  QS.stringify({
            username : this.newUsername,
            password : this.newPassword
          })
          axios.post('/loginApi/register', data)
          .then((response)=>{
            if(response.data == -1){
              window.alert('该用户已存在')
            }else if(response.data == "ok"){
              this.$router.push('/main');
              this.$store.commit('resetSoftwareList');
              window.alert('注册成功！');
              this.username = '';
              this.password = '';
              this.newUsername= '';
              this.newPassword= '';
            }else{
              window.alert('请重试！')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    } 
  }
</script>
<style scoped>
  .wrap{
    position: absolute;   
    top: 30%;   
    left: 50%;   
    -webkit-transform: translate(-50%, -50%);   
    -moz-transform: translate(-50%, -50%);   
    -ms-transform: translate(-50%, -50%);   
    -o-transform: translate(-50%, -50%);   
    transform: translate(-50%, -50%);   
  }
  .login-wrap{
    text-align: center;
  }
  h1{
    text-align: center;
    font-size: 40px;
  }
  input{
    display: block; 
    width: 250px; 
    height: 40px; 
    line-height: 40px; 
    margin: 0 auto; 
    margin-bottom: 10px; 
    outline: none; 
    border: 1px solid #888; 
    padding: 10px; 
    box-sizing: border-box;
  }
  p{
    color: red;
  }
  button{
    display: block; 
    width: 250px; 
    height: 40px; 
    line-height: 40px; 
    margin: 0 auto; 
    border: none; 
    background-color: #41b883; 
    color: #fff; 
    font-size: 16px; 
    margin-bottom: 5px;
  }
  span{
    display: block;
    text-align: center;
    cursor: pointer;
  }
  span:hover{
    color: #41b883;
  }
</style>