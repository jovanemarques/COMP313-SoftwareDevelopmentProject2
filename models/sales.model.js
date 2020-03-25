const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SalesSchema = new Schema({
    name: String,
});

SalesSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Sales', SalesSchema, 'sales');