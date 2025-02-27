const { Order } = require('../models');

exports.getOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { userId, products, total } = req.body;
    const order = await Order.create({ userId, products, total });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
