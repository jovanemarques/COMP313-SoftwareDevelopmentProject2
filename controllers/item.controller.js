const Item = require('../models/item.model');
const BaseController = require('./base.controller');

function ItemController() {
  BaseController.call(this, {model: Item});
}

ItemController.prototype = Object.create(BaseController.prototype);

module.exports = ItemController;