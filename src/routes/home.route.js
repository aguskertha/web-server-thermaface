const router = require('express').Router();
const {index} = require('./../controllers/home.controller')

router.use('/', index);

module.exports = router;
