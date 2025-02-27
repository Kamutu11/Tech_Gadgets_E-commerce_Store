module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      products: { type: DataTypes.JSON, allowNull: false },
      total: { type: DataTypes.DECIMAL(10,2), allowNull: false }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
    return Order;
  };
  