const router = require('express').Router();
const {index} = require('./../controllers/home.controller')

router.get('/', index);

module.exports = router;
