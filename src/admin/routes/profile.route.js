const router = require('express').Router();
const { renderProfile } = require('./../controllers/profile.controller')

router.get('/profile', renderProfile);

module.exports = router;
