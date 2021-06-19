const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playdateSchema = new Schema({
    title: {type: String},
    location: String,
    body: String,
    owner: Schema.Types.ObjectId,
    pet: Schema.Types.ObjectId,
    },
    {
    timestamps: true
 });
 //compiles schema to export
 module.exports = mongoose.model('Playdate', playdateSchema);