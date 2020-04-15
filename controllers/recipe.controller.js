const Recipe = require('../models/recipe.model');
const BaseController = require('./base.controller');

function RecipeController() {
  BaseController.call(this, {model: Recipe});
}

RecipeController.prototype = Object.create(BaseController.prototype);

RecipeController.prototype.listWithItems = function(req, res) {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 0;
    if (req.params.id) {
        Recipe
        .findById(req.params.id)
        .populate('items')
        .exec(function(err, model) {
            if (err) return res.status(500).send(err);
            res.send(model);
        }); 
    } else {
        Recipe.find({}, function(err, model) {
            if (err) return res.status(500).send(err);
            res.json(model);
        })
        .skip(size * (page - 1)) 
        .limit(size)
    }
  };

module.exports = RecipeController;