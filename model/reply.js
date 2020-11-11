//导入SQL配置
const {
    sequelize,
    DataTypes
} = require('./db');

//配置回复表的结构
const Reply = sequelize.define('Reply', {
    replyContent: {  //评论内容
        type: DataTypes.STRING,
        allowNull: false
    },
    replyDate: {    //评论的时间
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true //配置是否真正删除，如果为真只是添加一个删除时间
});

module.exports = Reply;