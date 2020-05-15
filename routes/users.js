var express = require('express');
var router = express.Router();
var User = require('../models/user');
var tokenSetter = require('../public/js/token_verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
  User.find((error, userList) => {
    if (error) {
      throw error;
    }
    const userNameList = userList.map(item => item.username);
    const { username, password } = req.body;
    if(userNameList.includes(username) && password === getUserInfo(userList, username).password) {
      tokenSetter.tokenSetter(username,password).then((data)=>{
        return res.send({ 
          errno: 200,
          message: 'ok',
          data: getUserInfo(userList, username),
          token: data, 
          });
      });
    } else if (!userNameList.includes(username)) {
      res.send({
        errno: 9999,
        errmsg: '该用户不存在',
      });
    } else {
      res.send({
        errno: 10000,
        errmsg: '用户名/密码错误',
      });
    }
  });
})
router.post('/vertify', function(req, res, next) {
	console.log(req.data);
	if(req.data){
		return res.json({
			msg:'身份验证成功'
		})
	}else{
		return res.json({
			msg:'未获取到用户信息'
		})
	}
	next();
});
router.post('/register', function (req, res, next) {
  let userList = [];
  User.find((error, user) => {
    userList = user;
    console.log(user);
  });
  const userNameList = userList.map(item => item.username);
  const { username, password } = req.body;
  if(userNameList && userNameList.includes(username)) {
    res.send({
      errno: 133333,
      errmsg: '该用户已存在',
    });
  }
  else {
    const userInfo = {
      username,
      password,
    }
    var userEntity = new User(userInfo);
    userEntity.save((error, ret) => {
      if (error) {
        console.log(error);
        return;
      }
      res.send({
        errno: 200,
        message: 'ok',
        userInfo: userEntity,
      });
      User.find((error, user) => {
        const userList = user;
        console.log(user);
      });
    })
    
  }
})
// router.post('/setRole', function (req, res, next) {

// })

function getUserInfo(userList, username) {
  for(let i = 0; i < userList.length; i++) {
    if(userList[i].username === username) {
      return userList[i];
    }
  }
  return {};
}
module.exports = router;
