const router = require('express').Router()
const { createDevice, deleteDevices, getDevices, getDeviceByDeviceID } = require('./../controllers/device.controller')

router.post('/', createDevice)
router.get('/', getDevices)
router.get('/:deviceID', getDeviceByDeviceID)
router.delete('/', deleteDevices)

module.exports = router
