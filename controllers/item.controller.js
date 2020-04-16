const Item = require('../models/item.model');
const BaseController = require('./base.controller');

function ItemController() {
  BaseController.call(this, {model: Item});
}

ItemController.prototype = Object.create(BaseController.prototype);

ItemController.prototype.updateQtyByItems = function(req, res) {
    const that = this;
    const items = req.body.items;
    items.forEach(async i => {
        try {
            const result = await Item.find({_id:i.item});
            if (result && result.length > 0 && result[0] && result[0].quantity >= i.quantity){
                result[0].quantity -= i.quantity;
                await result[0].save();
            } else {
                console.log(`Not possible to subtract the quantity.`);
            }
        } catch (error) {
            console.log(error);
            res.send(`Error: ${error}`)
        }
    });
    res.send(`Items updated`);
  };

module.exports = ItemController;