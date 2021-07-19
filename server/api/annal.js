// 增删改查
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
//增加或更新下载记录
router.post('/calendar', (req, res) => {
    let params = req.body
    let sql = "SELECT * from history WHERE user_name='" + params.username + "' AND software_id='" + params.softwareid + "'"
    pool.query(sql, function (err, data) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return res.status('500').send('服务器错误')
        }
        let history = data[0]
        if (data != '') {
            let searchSql = 'UPDATE history SET creat_time = ? WHERE id = ?';
            let searchSqlParams = [params.creattime, history.id];

            pool.query(searchSql, searchSqlParams, function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message)
                    return res.status('500').send('服务器错误')
                }

                console.log('-------UPDATA SUCCESS--------')
                return res.status('200').send('更新记录成功')
            })
            return
        }
        let addSql = 'INSERT INTO history (id,user_name,software_id,creat_time) VALUES(0,?,?,?)'
        pool.query(addSql, [params.username, params.softwareid, params.creattime], function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message)
                return res.status('500').send('服务器错误')
            }
            console.log('-------记录 SUCCESS--------')
            res.status('200').send('记录成功')
        })
    })
})
// 获取某个user的下载记录
router.post('/userNotes', (req, res) => {
    let params = req.body
    let allSql = "SELECT * from history WHERE user_name='" + params.username + "'"
    pool.query(allSql, function (err, data) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.status(200).send(data)
        console.log('-------获取记录 SUCCESS--------')
    })
})
// del
router.post('/del', (req, res) => {
    let params = req.body
    let delSql = 'DELETE FROM history where id=' + params.historyId
    pool.query(delSql, function (err, data) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        console.log('-------删除记录 SUCCESS--------')
        res.status(200).send('删除记录成功')
    })
})
module.exports = router