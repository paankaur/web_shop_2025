const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.get('/orders', (req, res) => orderController.getOrders(req, res));
router.post('/create-order', (req, res) => orderController.postCreateOrder(req, res));

module.exports = router;