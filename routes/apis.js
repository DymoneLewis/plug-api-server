var express = require('express');
var router = express.Router();
var hotApiList = [
  {
    id: 1,
    title: 'Test1',
    intro: 'this is 1st test api',
    owner: [
      {
        username: 'DymoneLewis',
        email: '111@123.com',
      },
    ],
    rate: 5,
    comments: [],
    hits: 10,
    createTime: '2020-04-10',
  },
  {
    id: 2,
    title: 'Test2',
    intro: 'this is 2nd test api',
    owner: [
      {
        username: 'DymoneLewis',
        email: '111@123.com',
      },
    ],
    rate: 3.5,
    comments: [],
    hits: 5,
    createTime: '2020-04-11',
  }
]
router.get('/', function(req, res, next) {
  res.send('this is api info');
});
router.get('/getApiInfo', function(req, res, next) {
  res.send(hotApiList);
})

module.exports = router;
