var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var diarySchema = new Schema({
  action: String,
  time: String,
  actor: Object
})
var Diary = mongoose.model('diary', diarySchema);
module.exports = Diary;