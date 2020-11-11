const {
    sequelize,
    DataTypes
} = require('./db');  //导入db.js文件
const News = sequelize.define('News', {
    newsTitle: {//新闻标题
        type: DataTypes.STRING,  //String类型
        allowNull: false         //不允许为空
    },
    newsSynopsis:{    //简介
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'这里理应是一个简短的介绍，由于发布者过于懒惰，没写。。。'//默认值
    },
    nwesCover:{     //图片（新闻封面）
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'https://www.baidu.com/img/dong_e8b80aecc2ee2ab14545e57e1ee7642b.gif'
    },
    newsContent: {   //新闻内容
        type: DataTypes.STRING,
        allowNull: false
    },
    postDate: {     //发布时间
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:new Date().getTime()
    },
    hits: {     //点击次数
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0   //默认为0
    },
    replies: {   //回复次数
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    ipAddress: {   //ip地址
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    }
}, {
    paranoid: true   //删除数据时不会真正的删除数据，只是页面上不显示，但是数据库中数据还存在且打上已删除的标识。
});                  //它会将要删除的数据打上delete time 若该参数有值则不在页面显示。
module.exports = News;