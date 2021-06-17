const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  gender: String,
  size: String,
  fixed: Boolean,
  owner: String

//   location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);