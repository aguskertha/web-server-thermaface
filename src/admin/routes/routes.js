const router = require('express').Router();
const dashboardRouter = require('./dashboard.route')
const profileRouter = require('./profile.route')
const {ensureAuthenticated} = require('./../middleware/auth');

router.use('/', ensureAuthenticated, dashboardRouter);
router.use('/', profileRouter);

module.exports = router;