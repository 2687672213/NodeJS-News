const {
    pathToRegexp
} = require('path-to-regexp');

/**
 *该模块负责token的认证，有些需要token的功能没有token直接报错 
 */

// 需要验证的名单
const needTokenApi = [{
    method: 'POST',
    path: '/api/user/userDelete'
}, {
    method: 'POST',
    path: '/api/user/whoAmI'
}, {
    method: 'POST',
    path: '/api/reply/replyAdd'
}];

//错误函数
function handleToken(req, res, next) {
    res.status(403).send({
        msg: 'no token',
        code: 403
    });
}

module.exports = (req, res, next) => {
    let token = req.headers.anthorization;
    //看看needTokenApi有没有需要token认证的请求
    const apis = needTokenApi.filter(api => {
        const reg = pathToRegexp(api.path);
        if (api.method === req.method && reg.test(req.path)) {
            return api.method === req.method && reg.test(req.path)
        }
    })
    // 如果你不是名单上的直接移交下一阶段
    if (apis.length === 0) {
        next();
        return;
    }

    //没有token认证的而且，在TokenApi名单上的
    if (!token) {
        handleToken(req, res, next);
        return;
    }
    //验证token OK
    next();
}