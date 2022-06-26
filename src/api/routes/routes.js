const router = require('express').Router();
const visitorRouter = require('./visitor.route')

router.use('/visitor', visitorRouter);

module.exports = router;