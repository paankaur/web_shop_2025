const Product = require("../models/product");

class productController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getProductById(req, res) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
async updateProductById(req, res) {
    try {
        const [updatedRows] = await Product.update(req.body, { where: { id: req.params.id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
        res.status(200).json({ product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
}

module.exports = new productController();
