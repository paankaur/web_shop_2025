const Product = require("../models/product");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

class orderController {
  async getOrders(req, res) {
    try {
      const orders = await req.user.getOrders({ include: [Product] });
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postCreateOrder(req, res) {
    try {
      const userCart = await req.user.getCart();
      const cartProducts = await userCart.getProducts();

      if (cartProducts.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // Calculate total
      const total = cartProducts.reduce((sum, product) => {
        return sum + product.price * product.cartItem.quantity;
      }, 0);

      const order = await Order.create({ total });
      await req.user.addOrder(order);

      const orderItems = cartProducts.map((product) => {
        return {
          orderId: order.id,
          productId: product.id,
          quantity: product.cartItem.quantity,
          price: product.price,
        };
      });

      await OrderItem.bulkCreate(orderItems);
      await userCart.setProducts([]);

      res.status(201).json({ message: "Order created", orderId: order.id });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new orderController();
