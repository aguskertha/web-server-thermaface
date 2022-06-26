const router = require('express').Router();
const { renderLogin, renderRegister, login, register, logout, updateProfileUser } = require('../controllers/auth.controller')

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)
router.post('/profile/update', updateProfileUser)

module.exports = router;
