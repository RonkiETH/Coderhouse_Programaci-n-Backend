const express = require('express');
const productsRoutes = require('./products.routes');
const cartsRoutes = require('./carts.routes');
const sessionRoutes = require('./session.routes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/session', sessionRoutes);

module.exports = router;