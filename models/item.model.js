const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    quantity: Number,
    baseUnit: String,
});

ItemSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Item', ItemSchema, 'item');