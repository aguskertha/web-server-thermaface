const router = require('express').Router();
const dashboardRouter = require('./dashboard.route')
const profileRouter = require('./profile.route')
const attendanceRouter = require('./attendance.route')
const visitorRouter = require('./visitor.route')
const deviceRouter = require('./device.route')
const {ensureAuthenticated} = require('./../middleware/auth');

router.use('/', ensureAuthenticated, dashboardRouter);
router.use('/', ensureAuthenticated, profileRouter);
router.use('/', ensureAuthenticated, attendanceRouter);
router.use('/', ensureAuthenticated, visitorRouter);
router.use('/', ensureAuthenticated, deviceRouter);

module.exports = router;