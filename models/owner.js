const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,

}, {
  timestamps: true
});

const ownerSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  pets: [petSchema],
  googleId: String,
//   location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema);