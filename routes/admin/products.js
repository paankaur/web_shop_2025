const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/product");

// POST /admin/add-product
router.post("/product/add", (req, res) => adminController.addProduct(req, res));
router.get("/products", (req, res) => adminController.getAllProducts(req, res));
router.get("/product/:id", (req, res) =>
  adminController.getProductById(req, res)
);
router.put("/product/:id", (req, res) =>
  adminController.updateProductById(req, res)
);
router.delete("/product/delete/:id", (req, res) =>
    adminController.deleteProductById(req, res)
);

module.exports = router;
