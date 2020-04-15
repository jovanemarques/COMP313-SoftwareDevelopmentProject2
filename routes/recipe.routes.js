const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const user_controller = new UserController();
const RecipeController = require('../controllers/recipe.controller');
const recipe_controller = new RecipeController();

router.get('/recipe/listWithItems/:id', user_controller.requiresLogin, recipe_controller.listWithItems.bind(recipe_controller));
router.get('/recipe/:id?', user_controller.requiresLogin, recipe_controller.list.bind(recipe_controller));
router.post('/recipe', user_controller.requiresLogin, recipe_controller.add.bind(recipe_controller));
router.put('/recipe/:id', user_controller.requiresLogin, recipe_controller.update.bind(recipe_controller));
router.delete('/recipe/:id', user_controller.requiresLogin, recipe_controller.delete.bind(recipe_controller));

module.exports = router;