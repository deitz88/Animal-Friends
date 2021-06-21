const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Owner = require('../models/owner');
const Pet = require('../models/pet');

const playdateSchema = new Schema({
    title: {type: String},
    location: String,
    body: String,
    owner: {type: Schema.Types.ObjectId, ref: 'Owner'},
    pet: {type: Schema.Types.ObjectId, ref: 'Pet'},
    },
    {
    timestamps: true
 });
 //compiles schema to export
 module.exports = mongoose.model('Playdate', playdateSchema);