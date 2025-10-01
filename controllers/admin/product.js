const Product = require("../../models/product");
const User = require("../../models/user");

class adminController {
  async addProduct(req, res) {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ message: "Product created", product, productId: product.id });
  }
  async addUser(req, res) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
      });
      res.status(201).json({ message: "User created", user, userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  async getAllProducts(req, res) {
    const products = await Product.findAll();
    res.status(200).json({ products });
  }
  async getProductById(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  }
  async updateProductById(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });
    res.status(200).json({ message: "Product updated", product });
  }
  async deleteProductById(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  }
}
module.exports = new adminController();
