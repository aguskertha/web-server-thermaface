const router = require('express').Router();
const homeRouter = require('./home.route')
const authRouter = require('./auth.route')
const adminRouter = require('./../admin/routes/routes')

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/', homeRouter);

module.exports = router;