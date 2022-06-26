const router = require('express').Router();
const homeRouter = require('./home.route')
const authRouter = require('./auth.route')

router.use('/auth', authRouter);
router.use('/', homeRouter);

module.exports = router;