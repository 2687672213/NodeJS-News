const express = require('express');
const router = express.Router();
const newService = require('../../service/newService');

//分页查找新闻
router.post('/getNews', async (req, res) => {
    const data = await newService.getNews(+req.body.index, +req.body.number);
    res.send({
        msg: '成功',
        data: data
    })
});

//添加新闻
router.post('/NewsAdd', async (req, res) => {
    const ins = await newService.NewAdd(req.body);
    if (ins) {
        res.send({
            msg: 'OK'
        })
    } else {
        res.send({
            msg: 'NO'
        })
    }
});

//独立新闻
router.post('/NewSelect', async (req, res) => {
    const ins = await newService.NewSelect(+req.body.id);
    res.send({
        msg: 'OK',
        data: ins
    })
});

// 增加播放量
router.post('/updateHits', async (req, res) => {
    const data = await newService.updateHits(+req.body.id, +req.body.hits + 1)
    res.send({
        msg: 'OK',
        data: data
    })
});

// 增加留言量
router.post('/updateReply', async (req, res) => {
    const data = await newService.updateReply(+req.body.id, +req.body.reply)
    res.send({
        msg: 'OK',
        data: data
    })
});

//该用户下所有的新闻
router.post('/getUserNews', async (req, res) => {
    const data = await newService.getUserNews(+req.body.id);
    res.send({
        msg: 'OK',
        data: data
    })
});

// 修改新闻
router.post('/updateNews', async (req, res) => {
    const data = await newService.updateNews(+req.body.id, req.body.news);
    res.send({
        msg: 'OK',
        data: data
    })
})

// 删除新闻
router.post('/deleteNes', async (req, res) => {
    const data = newService.deleteNew(+req.body.id);
    res.send({
        msg: 'OK',
        data: data
    })
})
module.exports = router;