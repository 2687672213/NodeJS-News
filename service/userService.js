const user = require('../model/User');
// const jwt = require('../route/jwt');

// 用户查重
const userSelectOff = async function (userObj) {
    // 在数据库中进行查询，如果有数据就返回，没有就返回空
    const ins = await user.findOne({
        where: {
            userName: userObj.userName
        }
    });
    // 将数据转化为对象
    const data = JSON.parse(JSON.stringify(ins));
    // 由于对象不能直接参与判断所以进行一次转化
    if (JSON.stringify(data) === '[]' || JSON.stringify(data) === '{}' || JSON.stringify(data) == 'null') {
        return true;
    } else {
        return false;
    }
}

// 用户注册
const userAdd = async function (userObj) {
    const flag = await userSelectOff(userObj);
    if (flag) {
        user.create(userObj);
        return true;
    } else {
        return null;
    }
}

//用户登录
const userLogin = async function (userObj) {
    // 查询登录的账号密码
    const ins = await user.findOne({
        where: {
            userName: userObj.userName,
            password: userObj.password
        }
    });
    //转换请求结果
    const flag = JSON.parse(JSON.stringify(ins));
    if (flag === null) {
        return null;
    } else {
        return flag;
    }
}

//用户注销
const userDelete = async function (userObj) {
    const flag = await userSelectOff(userObj);
    if (!flag) {
        user.destroy({
            where: {
                userName: userObj.userName
            }
        });
        return true;
    } else {
        return false;
    }
}

//查找用户
const whoAmI = async function (id) {
    const flag = await user.findByPk(id);
    const data = JSON.parse(JSON.stringify(flag));
    return data;
}

//修改用户
const updateUser = async function (userObj) {
    console.log(userObj);
    const ins = await user.update({
        nick: userObj.userObj.nick,
        email: userObj.userObj.email,
        password: userObj.userObj.password,
    }, {
        where: {
            id: userObj.id
        }
    })
    const data = JSON.parse(JSON.stringify(ins));
    return data;
}

module.exports = {
    userAdd,
    userLogin,
    whoAmI,
    userSelectOff,
    updateUser
}