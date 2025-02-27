const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
const cartRoute = require('./routes/cart');
const paypalRoute = require('./routes/paypal');

app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/cart', cartRoute);
app.use('/api/paypal', paypalRoute);

const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
