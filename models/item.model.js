const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    quantity: Number,
    baseUnit: String,
});

ItemSchema.pre('remove', { document: true, query: false }, function() {
    const that = this;
    const Recipe = require('./recipe.model');
    Recipe.find({items: that._id.toJSON()}, function (err, docs) {
        if (err) return console.log(err);
        if (docs && docs.length > 0){
            docs.forEach(d => {
                d.items.pull(that._id);
                d.save(function (err2, recipe) {
                    if (err2) return console.log(err2);
                });
            });
        }
    });
    //delete report
});

ItemSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Item', ItemSchema, 'item');