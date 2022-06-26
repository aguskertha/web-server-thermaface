const router = require('express').Router();
const { renderLogin, renderRegister } = require('./../controllers/auth.controller')

router.use('/login', renderLogin);
router.use('/register', renderRegister);

module.exports = router;
