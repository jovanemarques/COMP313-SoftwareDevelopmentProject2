const Recipe = require('../models/recipe.model');
const BaseController = require('./base.controller');

function RecipeController() {
  BaseController.call(this, {model: Recipe});
}

RecipeController.prototype = Object.create(BaseController.prototype);

module.exports = RecipeController;