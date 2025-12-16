const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/cart", (req, res) => shopController.getCart(req, res));
router.post("/cart/add/:id", (req, res) => shopController.postAddToCart(req, res));
router.post("/cart/remove/:id", (req, res) => shopController.postRemoveFromCart(req, res));

module.exports = router;
