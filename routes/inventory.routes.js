const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const user_controller = new UserController();
const InventoryController = require('../controllers/inventory.controller');
const inventory_controller = new InventoryController();

router.get('/inventory/:id?', user_controller.requiresLogin, inventory_controller.list.bind(inventory_controller));
router.post('/inventory', user_controller.requiresLogin, inventory_controller.add.bind(inventory_controller));
router.put('/inventory/:id', user_controller.requiresLogin, inventory_controller.update.bind(inventory_controller));
router.delete('/inventory/:id', user_controller.requiresLogin, inventory_controller.delete.bind(inventory_controller));

module.exports = router;