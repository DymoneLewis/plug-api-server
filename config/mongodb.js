const mongoose = require('mongoose');
const config = require('./config');
module.exports = () => {
  mongoose.connect(config.mongodb, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    console.log(db.name, 'Connect Success');
  });
  mongoose.connection.on('connected', () => {
    console.log('----------------------Connect Success----------------------');
  });
  mongoose.connection.on('error', () => {
    console.log('----------------------Connect error----------------------');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('----------------------disconnected----------------------');
  });
}