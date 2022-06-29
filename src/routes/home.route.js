const router = require('express').Router();
const {index, renderClientPage, renderRegisterClient, registerClient, logout} = require('./../controllers/home.controller')

router.get('/', index);
router.post('/client', renderClientPage);
router.get('/register', renderRegisterClient);
router.post('/register', registerClient);
router.get('/logout', logout);

module.exports = router;
