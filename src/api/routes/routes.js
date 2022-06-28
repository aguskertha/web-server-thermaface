const router = require('express').Router();
const visitorRouter = require('./visitor.route')
const deviceRouter = require('./device.route')

router.use('/visitor', visitorRouter);
router.use('/device', deviceRouter);

module.exports = router;