const router = require('express').Router();
const { renderLogin, renderRegister, login, register, logout } = require('./../controllers/auth.controller')

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)

module.exports = router;
