const express = require('express');
const reply = require('../../service/replyService');
const router = express.Router();

//添加
router.post('/replyAdd', async (req, res) => {
    const ins = await reply.replyAdd(req.body);
    res.send({
        smg: 'OK',
        data: ins
    })
});

//查找新闻
router.post('/replySelect', async (req, res) => {
    const ins = await reply.replySelect(+req.body.NewsId);
    res.send({
        msg: 'OK',
        data: ins
    })
})

//我评论的
router.post('/mypl', async (req, res) => {
    const ins = await reply.mypl(+req.body.userId);
    res.send({
        msg: 'ok',
        data: ins
    })
})

//删除评论
router.post('/deleteReply', async (req, res) => {
    const ins = await reply.deleteReply(+req.body.id);
    res.send({
        msg: 'ok',
        data: ins
    })
})



module.exports = router;