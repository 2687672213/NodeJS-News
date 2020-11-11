//导入三个表
const News = require('./News');
const User = require('./User');
const Reply = require('./reply');
//user表跟news主外键强关联  （双向箭头）
User.hasMany(News);     //News是外键，User是主键  A.（b）  A为主导
News.belongsTo(User);   //与上一句意义差不多
//news表跟reply表进行主外键关联
News.hasMany(Reply);
Reply.belongsTo(News);
// user表跟reply表进行主外键强关联
User.hasMany(Reply);
Reply.belongsTo(User);