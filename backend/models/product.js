module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      stock: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: true }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
    return Product;
  };
  