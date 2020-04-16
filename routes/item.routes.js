const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const user_controller = new UserController();
const ItemController = require('../controllers/item.controller');
const item_controller = new ItemController();

router.get('/item/:id?', user_controller.requiresLogin, item_controller.list.bind(item_controller));
router.post('/item', user_controller.requiresLogin, item_controller.add.bind(item_controller));
router.post('/item/updateQtyByItems', user_controller.requiresLogin, item_controller.updateQtyByItems.bind(item_controller));
router.put('/item/:id', user_controller.requiresLogin, item_controller.update.bind(item_controller));
router.delete('/item/:id', user_controller.requiresLogin, item_controller.delete.bind(item_controller));

module.exports = router;