const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var InventorySchema = new Schema({
    name: String,
});

InventorySchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Inventory', InventorySchema, 'inventory');