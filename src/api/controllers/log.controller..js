const ObjectID = require('mongodb').ObjectId;
const Log = require('../models/log.model.js')

const createLog = async (req, res, next) => {
    try {
        const {name} = req.body;

        const newLog = new Log({
            name,
            counter: 1
        })
        await newLog.save()
        
        res.json({message: 'Log successfully created!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getLogs = async (req, res, next) => {
    try {
        const logs = await Log.find()
        res.json(logs)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getLogByName = async (req, res, next) => {
    try {
        const name = req.params.name
        const log = await Log.findOne({name: name})
        if(!log) throw "Log not found!"
        res.json(log)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const updateCounter = async (req, res, next) => {
    try {
        const {name, counter} = req.body
        const log = await Log.findOne({name: name})
        if(!log) throw 'Log not found!'

        await Log.updateOne(
            { name: name },
            {
                $set: {
                    counter: counter
                }
            }
        )
        res.json({message: "Log recorded!"})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteLogs = async (req, res, next) => {
    try {
        await Log.deleteMany()
        res.json({message: 'Successfully deleted logs!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createLog,
    getLogs,
    getLogByName,
    updateCounter,
    deleteLogs
}