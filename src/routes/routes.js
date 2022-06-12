const router = require('express').Router();
const dashboardRouter = require('./dashboard.route')


router.use('/dashboard', dashboardRouter);

module.exports = router;