const New = require('../model/News');
const User = require('../model/User');
// 关联文件，不导入就会显示多表联查失败
require('../model/relevance');

// 添加新闻
const NewAdd = function (NewObj) {
    const NewObj1 = NewObj.nwesCover == '' ? {
        newsTitle: NewObj.newsTitle,
        newsSynopsis: NewObj.newsSynopsis,
        newsContent: NewObj.newsContent,
        postDate: NewObj.postDate,
        UserId: NewObj.UserId
    } : NewObj;
    New.create(NewObj1);
    return true;
}

//查找单个新闻
const NewSelect = async function (id) {
    const ins = await New.findByPk(id, {
        include: [User]
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//修改点击量
const updateHits = async function (id, hits) {
    //    updata 第一个参数是要修改的 第二个参数是限制
    const ins = await New.update({
        hits: hits
    }, {
        where: {
            id: id
        }
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//修改留言数
const updateReply = async function (id, reply) {
    const ins = await New.update({
        replies: reply
    }, {
        where: {
            id: id
        }
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//修改新闻
const updateNews = async function (id, news) {
    const ins = await New.update({
        newsTitle: news.newsTitle,
        newsSynopsis: news.newsSynopsis,
        nwesCover: news.nwesCover,
        newsContent: news.newsContent
    }, {
        where: {
            id: id
        }
    })
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//分页查找新闻
const getNews = async function (index, number) {
    const ins = await New.findAndCountAll({
        offset: (index - 1) * number, // 跳过几个
        limit: number, //取几个
        include: [User],
        order: [
            ['id', 'DESC']
        ] //倒序输出
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//查找某个USER下的所有新闻
const getUserNews = async function (id) {
    const ins = await New.findAll({
        where: {
            UserId: id
        },
        order: [
            ['id', 'DESC']
        ] //倒序输出
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

// 删除新闻
const deleteNew = async function (id) {
    const ins = New.destroy({
        where: {
            id: id
        }
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

// 导出各个方法
module.exports = {
    NewAdd,
    NewSelect,
    getNews,
    updateHits,
    updateReply,
    getUserNews,
    updateNews,
    deleteNew
}