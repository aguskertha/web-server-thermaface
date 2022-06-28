const Device = require('./../models/device.model')

const createDevice = async (req, res, next) => {
    try {
        const {name, deviceID, deviceCode} = req.body
        const newDevice = new Device({name, deviceID, deviceCode})
        await newDevice.save()
        res.json({message: 'Device Successfully created!'})

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getDevices = async (req, res, next) => {
    try {
        const devices = await Device.find().sort({createdAt: -1})
        res.json(devices)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteDevices = async (req, res, next) => {
    try {
        await Device.deleteMany()
        res.json({message: 'Devices Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getDeviceByDeviceID = async (req, res, next) => {
    try {
        const deviceID = req.params.deviceID
        const device = await Device.findOne({deviceID: deviceID})
        if(device){
            return res.json(device)
        }
        throw `Device with deviceID: ${deviceID} not found!`
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createDevice,
    deleteDevices,
    getDevices,
    getDeviceByDeviceID
}