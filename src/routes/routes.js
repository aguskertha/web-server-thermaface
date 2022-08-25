const router = require('express').Router();
const homeRouter = require('./home.route')
const authRouter = require('../admin/routes/auth.route')
const adminRouter = require('./../admin/routes/routes')
const apiRouter = require('./../api/routes/routes')
const orderRouter = require('./../routes/order.route')
const productRouter = require('./../routes/product.route')
const deviceRouter = require('./../routes/device.route')
const messageRouter = require('./../routes/message.route')

router.use('/auth', authRouter);
router.use('/order', orderRouter);
router.use('/admin', adminRouter);
router.use('/api', apiRouter);
router.use('/product', productRouter);
router.use('/device', deviceRouter);
router.use('/message', messageRouter);
router.use('/', homeRouter);

module.exports = router;