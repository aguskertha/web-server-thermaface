const Device = require('./../models/device.model')
const ObjectID = require('mongodb').ObjectId;

const createDevice = async (req, res, next) => {
    try {
        const {name, deviceID, deviceCode} = req.body
        const newDevice = new Device({name, deviceID, deviceCode, status:false})
        await newDevice.save()
        res.json({message: 'Device Successfully created!'})
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const updateStatusDevice = async (req, res, next) => {
    try {
        const {userID, deviceID, status} = req.body
        const device = await Device.findOne({deviceID: deviceID})
        if(!device) throw 'Device not found!'
        if(device.status) throw 'Device already assign!'
        await Device.updateOne(
            { _id: ObjectID(device._id) },
            {
                $set: {
                    userID: ObjectID(userID),
                    status: status
                }
            }
        )
        res.json({message: 'Device Successfully updated!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
        
    }
}

const getDevices = async (req, res, next) => {
    try {
        const devices = await Device.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userID",
                    "foreignField": "_id",
                    "as": "users"
                }
            }
        ]).sort({createdAt: -1})
        // const devices = await Device.find().sort({createdAt: -1})
        console.log(devices)
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

const deleteDeviceByID = async (req, res, next) => {
    try {
        const deviceID = req.params.deviceID
        const device = await Device.findOne({_id: ObjectID(deviceID)})
        if(!device) throw 'Device not found!'
        await Device.deleteOne({_id: ObjectID(deviceID)})
        res.json({message: 'Device Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getDevicesByUserID = async (req, res, next) => {
    try {
        const userID = req.params.userID
        console.log(userID)
        const devices = await Device.aggregate([
            { $match : { userID : ObjectID(userID) } },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userID",
                    "foreignField": "_id",
                    "as": "users"
                }
            }
        ]).sort({createdAt: -1})
        res.json(devices)
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
    getDeviceByDeviceID,
    deleteDeviceByID,
    updateStatusDevice,
    getDevicesByUserID
}