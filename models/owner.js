const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ownerSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
//   location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema);