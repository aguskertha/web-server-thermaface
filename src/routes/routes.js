const router = require('express').Router();
const homeRouter = require('./home.route')
const authRouter = require('./auth.route')
const adminDashboardrouter = require('./../admin/routes/dashboard.route')

router.use('/auth', authRouter);
router.use('/admin', adminDashboardrouter);
router.use('/', homeRouter);

module.exports = router;