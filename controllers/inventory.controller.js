const Inventory = require('../models/inventory.model');
const BaseController = require('./base.controller');

function InventoryController() {
  BaseController.call(this, {model: Inventory});
}

InventoryController.prototype = Object.create(BaseController.prototype);

module.exports = InventoryController;