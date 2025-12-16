const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

class shopController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCart(req, res) {
    const userCart = await req.user.getCart();
   // console.log(userCart);
    const cartProducts = await userCart.getProducts();
    res.status(200).json({ products: cartProducts });
  }

  async postAddToCart(req, res) {
    const prodId = req.params.id;
    let fetchedCart;
    let newQuantity = 1;

    try {
      const userCart = await req.user.getCart();
      fetchedCart = userCart;

      const cartProducts = await userCart.getProducts({ where: { id: prodId } });
      let product;
      if (cartProducts.length > 0) {
        product = cartProducts[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
      } else {
        product = await Product.findByPk(prodId);
        await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
      }
      res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postRemoveFromCart(req, res) {
    const prodId = req.params.id;

    try {
      const userCart = await req.user.getCart();
      const cartProducts = await userCart.getProducts({ where: { id: prodId } });

      if (cartProducts.length === 0) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      const product = cartProducts[0];
      await product.cartItem.destroy();
      res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new shopController();