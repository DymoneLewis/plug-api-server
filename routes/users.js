var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(router);
  res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.passsword) {
    res.send({
      errno: 10000,
      errmsg: '用户名/密码错误',
    })
  }
})
module.exports = router;
