var express = require('express');
var router = express.Router();
var request = require('request');
var Api = require('../models/api');
var _ = require('lodash');

router.get('/', function(req, res, next) {
  res.send('this is api info');
});
router.post('/getHotApiInfo', function(req, res, next) {
  if(_.isEmpty(req.body)) {
    Api.find({status: 7}, (error, hotApiList) => {
      if(error) {
        throw error;
      }
      console.log(hotApiList);
      res.send(hotApiList);
    })
  }
  else {
    Api.find(
    {
      status: 7,
      rate: req.body.rate,
      $or: [
        { title: {$regex: `${req.body.title}`, $options:"$i"} },
        { owner: req.body.owner },
      ]
      
    }, (error, apiList) => {
    if(error) {
      throw error;
    }
    res.send(apiList);
  })
  }
})
router.post('/getApiInfo', function(req, res, next) {
  if(_.isEmpty(req.body)) {
    Api.find((error, apiList) => {
      if(error) {
        throw error;
      }
      res.send(apiList);
    })
  }
  else {
    Api.find(
    {
      $or: [
        { title: {$regex: `${req.body.title}`, $options:"$i"} },
        { rate: req.body.rate },
        { owner: req.body.owner },
        { status: req.body.status },
      ]
      
    }, (error, apiList) => {
    if(error) {
      throw error;
    }
    res.send(apiList);
  })
  }
})

router.post('/createApi', (req, res, next) => {
  console.log(req.body);
  var newApi = new Api(req.body);
  console.log(newApi);
  newApi.save((error, data) => {
    if (error) {
      throw error;
    }
    console.log(data);
    res.send(data);
  })
})

router.post('/deleteApi', (req, res, next) => {
  console.log(req.body);
  Api.deleteOne(req.body, (error, data) => {
    if(error) {
      throw error
    }
    res.send(data);
  })
})

router.post('/updateApi', (req, res, next) => {
  Api.update({_id: req.body._id},{$set: req.body.data}, {multi: true}, (error, data) => {
    if(error) {
      throw error;
    }
    console.log(data);
    res.send(data);
  })
})
router.post('/auditApi', (req, res, next) => {
  Api.update(req.body,{$set: {status: 3}}, {multi: true}, (error, data) => {
    if(error) {
      throw error;
    }
    console.log(data);
    res.send(data);
  })
})

router.post('/testApi', (req, res, next) => {
  console.log('this is url', req.body.url);
  const options = {
      method: req.body.method,
      uri: req.body.url,
      headers: req.body.headers || {},
      json: {
        "content": req.body.params,
      },
      gzip:true,
    };
  request(options, function (error, response, body) {
    res.send(body);
  })
})
module.exports = router;