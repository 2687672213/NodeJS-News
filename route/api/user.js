require('../../model/relevance');
const user = require('../../service/userService');
const express = require('express');

//声明并配置路由
const router = express.Router();
const jwt = require('../jwt');
//登录请求；
router.post('/login', async (req, res) => {
    const data = await user.userLogin(req.body);
    if (data) {
        const a = jwt.encryption(res, {
            id: data.id,
            nick: data.nick
        });
        res.send({
            msg: '登陆成功！',
            data: data
        })

    } else {
        res.send({
            msg: '登陆失败！'
        })
    }
});

//注册；
router.put('/userAdd', async (req, res) => {
    const data = req.body;
    const r = await user.userAdd(data);
    if (r) {
        res.send({
            msg: '添加成功'
        })
    } else {
        res.send({
            msg: '添加失败'
        })
    }
})

//验证用户权限
router.get('/whoAmI', async (req, res) => {
    try {
        const obj = await jwt.decode(req.headers.anthorization);
        const info = await user.whoAmI(obj.id);
        res.send({
            msg: '查询成功！',
            data: info
        })
    } catch {
        res.send({
            msg: 'token有问题！！',
            data: null
        })
    }

})

//查询用户是否重复
router.post('/userSelectOff', async (req, res) => {
    const ins = await user.userSelectOff(req.body);
    if (ins) {
        res.send({
            msg: '允许添加'
        });
    } else {
        res.send({
            msg: '添加重复'
        })
    }
})

//修改用户基本信息
router.post('/upDate', async (req, res) => {
    // console.log();
    const ins = await user.updateUser(req.body);
    if (ins) {
        res.send({
            msg: '修改成功',
            data:ins
        });
    } else {
        res.send({
            msg: '修改失败'
        })
    }
})


module.exports = router;