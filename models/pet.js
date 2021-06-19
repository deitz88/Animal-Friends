const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  gender: String,
  size: String,
  fixed: String,
  owner: Schema.Types.ObjectId,
  about: String,

//   location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);