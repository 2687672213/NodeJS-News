const jwt = require('jsonwebtoken');
const key = 'zbc';
/**
 *
 *
 * @param {*} res 请求头
 * @param {*} obj 加密数据
 * @return {*} 加密模块
 */
const encryption = function (res, obj) {
    const str = jwt.sign(obj, key, {
        expiresIn: 36000
    });
    // 将加密的数据附带到请求头，方便以后操作
    res.header("anthorization", str);;
    return str;
}
/**
 * @param {*} str 加密字符串
 * @return {*} 解密模块
 */
const decode = async function (str) {
    if (!str) {
        return null;
    }
    str = str.split(' ');
    str = str.length === 2 ? str[1] : str[0];
    try {
        console.log(str, key);
        const obj = await jwt.verify(str, key);
        return obj;
    } catch {
        console.log('解析失败');
    }

}

module.exports = {
    encryption,
    decode
}