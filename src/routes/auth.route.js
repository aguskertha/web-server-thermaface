const router = require('express').Router();
const { renderLogin, renderRegister, login, register } = require('./../controllers/auth.controller')

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login)
router.post('/register', register)

module.exports = router;
