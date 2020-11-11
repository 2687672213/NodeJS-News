const {
    sequelize
} = require('./db');
require('./User');
require('./News');
require('./relevance');
require('./reply');
sequelize.sync();   // 导入五个文件，按照五个文件里的规则。自动生成表的方法。
