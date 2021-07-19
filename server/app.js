var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var list = require('./api/list')
var loginRegister = require('./api/loginRegister')
var annal = require('./api/annal')
var ejs = require('ejs')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
// app.engine('html',ejs.__express)
// app.set('view engine', 'html')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')))

app.use('/listApi', list)
app.use('/loginApi', loginRegister)
app.use('/annalApi', annal)

// 访问单页(刷新页面不丢失)
app.get('*', function (req, res) {
  // 同步读取文件
  var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

// 监听
app.listen(5000, function () {
  console.log('success listen http://127.0.0.1:5000')
})