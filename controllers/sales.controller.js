const Sales = require('../models/sales.model');
const BaseController = require('./base.controller');

function SalesController() {
  BaseController.call(this, {model: Sales});
}

SalesController.prototype = Object.create(BaseController.prototype);

module.exports = SalesController;