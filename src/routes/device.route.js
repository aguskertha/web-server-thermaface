const router = require('express').Router()
const { renderDevicePage, renderCreateDevicePage, createDevice, deleteDevice } = require('../controllers/device.controller')

router.get('/', renderDevicePage)
router.get('/create', renderCreateDevicePage)
router.get('/delete/:deviceID', deleteDevice)
router.post('/', createDevice)

module.exports = router