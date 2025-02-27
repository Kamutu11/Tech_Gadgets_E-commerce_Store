module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
    return Cart;
  };
  