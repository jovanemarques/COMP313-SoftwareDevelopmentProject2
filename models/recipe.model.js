const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: String,
    items:[{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
        }
    }]
});

RecipeSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Recipe', RecipeSchema, 'recipe');