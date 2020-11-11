const mysql = require('mysql2');
//导入ORM框架管理数据库
const {
    Sequelize,
    DataTypes
} = require('sequelize');
// SQL基本配置
const sequelize = new Sequelize('newsdb', 'root', '000000', {    //数据库名，账号，密码
    host: 'localhost',   //数据库的地址
    dialect: 'mysql'     //数据库的驱动
});
// 连接数据库
(async function () {
    try {
        await sequelize.authenticate();
        console.log('数据库已连接');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

// 导出配置
module.exports = {
    sequelize,  //创建数据库的接口
    DataTypes   //设计数据库的数据类型格式
};