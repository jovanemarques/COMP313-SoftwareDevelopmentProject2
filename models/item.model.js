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
    Recipe.find({'items.item': that._id.toJSON()}, function (err, docs) {
        if (err) return console.log(err);
        if (docs && docs.length > 0){
            docs.forEach(d => {
                console.log(d.items);
                d.items.forEach(i => {
                    if (i.item.toJSON() == that._id.toJSON()) {
                        i.remove();
                    }
                });;
                console.log(d.items);
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