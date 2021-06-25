const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  gender: String,
  size: String,
  fixed: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Owner'},
  about: String,
  petImage: String,
  location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);