const reply = require('../model/reply');
const UserId = require('../model/User');
const NewsId = require('../model/News');
require('../model/relevance');

//添加留言
const replyAdd = async function (replyObj) {
    const ins = await reply.create(replyObj);
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//查找某个新闻的全部留言
const replySelect = async function (NewsId) {
    const ins = await reply.findAll({
        where: {
            NewsId: NewsId
        },
        include: [UserId]
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

const mypl = async function (Userid) {
    const ins = await reply.findAll({
        where: {
            UserId: Userid
        },
        include: [UserId, NewsId]
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

//删除留言
const deleteReply = async function (id1) {
    console.log(id1);
    const ins = reply.destroy({
        where: {
            id: id1
        }
    });
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

module.exports = {
    replyAdd,
    replySelect,
    mypl,
    deleteReply
}