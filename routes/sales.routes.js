const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const user_controller = new UserController();

const SalesController = require('../controllers/sales.controller');
const sales_controller = new SalesController();

router.get('/sales/:id?', user_controller.requiresLogin, sales_controller.list.bind(sales_controller));
router.post('/sales', user_controller.requiresLogin, sales_controller.add.bind(sales_controller));
router.put('/sales/:id', user_controller.requiresLogin, sales_controller.update.bind(sales_controller));
router.delete('/sales/:id', user_controller.requiresLogin, sales_controller.delete.bind(sales_controller));

module.exports = router;