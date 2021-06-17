const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playdateSchema = new Schema({
    title: {type: String},
    owner: [{type: Schema.Types.ObjectId, ref: 'Owner'}],
    body: {String}
    },
    {
    timestamps: true
 });
 //compiles schema to export
 module.exports = mongoose.model('Playdate', playdatetSchema);