const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

// 映射静态资源
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//允许跨域
app.use(cors());

//验证token
app.use(require('./tokenMolliz'));

//处理from表单过来的数据
app.use(express.urlencoded({
    extended: true
}))

//处理JSON数据
app.use(express.json());

//处理新闻请求路由
app.use('/api/news', require('./api/news'));

//处理用户请求路由
app.use('/api/user', require('./api/user'));

//处理用户留言
app.use('/api/reply',require('./api/reply'));

const port = 8848;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});