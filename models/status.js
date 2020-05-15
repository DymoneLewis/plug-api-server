var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var statusSchema = new Schema({
  No: Number,
  status: String,
})
var Status = mongoose.model('status', statusSchema, 'status');
module.exports = Status;