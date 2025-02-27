const { Cart, CartItem, Product } = require('../models');

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }]
    });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ cartId: cart.id, productId, quantity });
    }
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;
    let item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    
    const cart = await Cart.findOne({ where: { userId } });
    if (item.cartId !== cart.id) {
      return res.status(403).json({ error: 'Not authorized to update this item' });
    }
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    let item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    
    const cart = await Cart.findOne({ where: { userId } });
    if (item.cartId !== cart.id) {
      return res.status(403).json({ error: 'Not authorized to remove this item' });
    }
    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { userId } });
    if (cart) {
      await CartItem.destroy({ where: { cartId: cart.id } });
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
