const router = require('express').Router();
const visitorRouter = require('./visitor.route')
const deviceRouter = require('./device.route')
const orderRouter = require('./order.route')
const productRouter = require('./product.route')
const clientRouter = require('./client.route')
const cartRouter = require('./cart.route')

router.use('/visitor', visitorRouter);
router.use('/device', deviceRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/client', clientRouter);
router.use('/cart', cartRouter);

module.exports = router;