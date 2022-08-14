const router = require('express').Router();
const { renderDevice, assignDevice } = require('./../controllers/device.controller')

router.get('/device', renderDevice);
router.post('/device/assign', assignDevice);

module.exports = router;
