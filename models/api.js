var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiSchema = new Schema({
  title: String,
  path: String,
  schemes: String,
  method: String,
  params: Array,
  query: Array,
  output: Object,
  status: Number,
  rate: Number,
  example: String,
  intro: String,
  owner: String,
  createTime: String,
  submitTime: String,
  auditTime: String,
  testTime: String,
})
var Api = mongoose.model('api', apiSchema, 'api');
module.exports = Api;