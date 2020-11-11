//导入SQL配置
const {
    sequelize,
    DataTypes
} = require('./db');

// 配置USER表的结构
const User = sequelize.define('User', {
    nick: {    //昵称
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {    //用户名（登录名）
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {    //密码
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {    //邮箱
        type: DataTypes.STRING,
        allowNull: false
    },
    integral: {    //用户积分
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:0
    }
}, {
    paranoid: true //配置是否真正删除，如果为真只是添加一个删除时间
})
// 导出配置
module.exports = User;