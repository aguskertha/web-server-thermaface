const router = require('express').Router();
const visitorRouter = require('./visitor.route')
const deviceRouter = require('./device.route')
const orderRouter = require('./order.route')
const productRouter = require('./product.route')
const clientRouter = require('./client.route')
const cartRouter = require('./cart.route')
const testimonialRouter = require('./testimonial.route')
const logRouter = require('./log.route')
const contactRouter = require('./contact.route')

router.use('/visitor', visitorRouter);
router.use('/device', deviceRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/client', clientRouter);
router.use('/cart', cartRouter);
router.use('/testimonial', testimonialRouter);
router.use('/log', logRouter);
router.use('/contact', contactRouter);

module.exports = router;