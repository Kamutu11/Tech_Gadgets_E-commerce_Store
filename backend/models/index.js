const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);

db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

db.Cart = require('./cart')(sequelize, Sequelize);
db.CartItem = require('./cartItem')(sequelize, Sequelize);

db.User.hasOne(db.Cart, { foreignKey: 'userId' });
db.Cart.belongsTo(db.User, { foreignKey: 'userId' });

db.Cart.hasMany(db.CartItem, { foreignKey: 'cartId' });
db.CartItem.belongsTo(db.Cart, { foreignKey: 'cartId' });

db.Product.hasMany(db.CartItem, { foreignKey: 'productId' });
db.CartItem.belongsTo(db.Product, { foreignKey: 'productId' });


module.exports = db;
