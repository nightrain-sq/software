// 增删改查
var express = require('express')
var mysql = require('mysql')
var md5 = require('blueimp-md5')

//设置好配置项
const config = {
    host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'software',
        port: '3306',
        charset: 'UTF8_GENERAL_CI',
        connectionLimit: 10 //最大连接数
}
var router = express.Router()

// 创建连接
const pool = mysql.createPool(config);

// 注册
router.post('/register', (req, res) => {
  let params = req.body
  let sql = "SELECT * from user WHERE userName='"+ params.username+"'"
  pool.query(sql,function (err, data) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message)
      return res.status('500').send('服务器错误')
    }
    if(data != ''){
        return res.status("200").send('-1')
    }
    let password = md5(md5(params.password))
    let addSql = 'INSERT INTO user (id,userName,passWord) VALUES(0,?,?)'
    pool.query(addSql,[params.username, password],function (err, result) {
      if(err){
          console.log('[INSERT ERROR] - ',err.message)
          return res.status('500').send('服务器错误')
      }    
      req.session.user = params.username 
      res.status('200').send('ok')
      console.log('-------REGISTER SUCCESS--------')
      console.log('INSERT ID:',result.insertId)       
      console.log('RESULT:',result)     
    })
  })
})

//登录
router.post('/login',(req,res) => {
    let params = req.body
    let password = md5(md5(params.password))
    let sql1 =  "SELECT * from user WHERE userName='"+ params.username+"'"
    // console.log(sql)
    pool.query(sql1,function (err, data) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message)
        return res.status('500').send('服务器错误')
    }
    if(data == ''){
        return res.status("200").send('-1')
    }
    let sql2="SELECT * from user WHERE userName='"+ params.username+"' AND passWord='"+ password+"'"
    pool.query(sql2,function (err, data){
        if(err){
            console.log('[SELECT ERROR] - ',err.message)
            return res.status('500').send('服务器错误')
        }
        if(data == ''){
            return res.status("200").send('0')
        } 
        req.session.user = params.username
        res.status('200').send('ok')
        console.log('-------LOGIN SUCCESS--------')
        // console.log(data)
        })
    })
})
router.get('/session',(req,res) => {
    res.send(req.session.user)
})
router.get('/logout',(req,res) => {
    req.session.user = ''
    res.status(200).send('session清除成功')
})
module.exports = router