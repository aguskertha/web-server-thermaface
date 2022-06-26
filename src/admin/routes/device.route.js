const router = require('express').Router();
const { renderDevice } = require('./../controllers/device.controller')

router.get('/device', renderDevice);

module.exports = router;
