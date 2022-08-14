const router = require('express').Router()
const { createDevice, deleteDevices, getDevices, getDeviceByDeviceID, deleteDeviceByID, updateStatusDevice, getDevicesByUserID } = require('./../controllers/device.controller')

router.post('/', createDevice)
router.post('/status', updateStatusDevice)
router.get('/', getDevices)
router.get('/user/:userID', getDevicesByUserID)
router.get('/:deviceID', getDeviceByDeviceID)
router.delete('/:deviceID', deleteDeviceByID)
router.delete('/', deleteDevices)

module.exports = router
