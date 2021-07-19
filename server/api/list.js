var express = require('express')
var mysql = require('mysql')

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

//分页查数据列表
router.post('/list',(req,res) => {
    let page = req.body.num;
    let start = (page - 1) * 35;
    let  sql = 'SELECT * FROM softwarelist limit ' + start + ',35';
    // console.log(sql);
    pool.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.status(200).send(result)
        console.log('-------获取分页软件列表 SUCCESS--------')
    })
})
//查询整个软件数据列表
router.post('/allList',(req,res) => {
    let allsql = 'SELECT * FROM softwarelist';
    // console.log(sql);
    pool.query(allsql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.status(200).send(result)
        console.log('-------获取所有软件列表 SUCCESS--------')
    })
})
module.exports = router