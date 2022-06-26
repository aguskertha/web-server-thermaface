const router = require('express').Router();
const homeRouter = require('./home.route')
const authRouter = require('../admin/routes/auth.route')
const adminRouter = require('./../admin/routes/routes')
const apiRouter = require('./../api/routes/routes')

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/api', apiRouter);
router.use('/', homeRouter);

module.exports = router;