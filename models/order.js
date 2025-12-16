const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false,
  },
});

module.exports = Order;
