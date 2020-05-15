var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  account: String,
  username: String,
  password: String,
  role: String,
  email: String,
  introduction: String,
  head: String
})
var User = mongoose.model('user', userSchema, 'user');
module.exports = User;