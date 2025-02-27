const { Product } = require('../models');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    const { name, brand, description, price, stock } = req.body;
    const product = await Product.create({ name, brand, description, price, stock, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, brand, description, price, stock } = req.body;
    let product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || product.imageUrl;
    await product.update({ name, brand, description, price, stock, imageUrl });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const products = await Product.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { name: { [require('sequelize').Op.like]: `%${q}%` } },
          { brand: { [require('sequelize').Op.like]: `%${q}%` } },
          { description: { [require('sequelize').Op.like]: `%${q}%` } }
        ]
      }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
