const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const Visitor = require('./../models/visitor.model')
const Device = require('./../models/device.model')

const createVisitor = async (req, res, next) => {
    try {
        const {datetime, deviceID, temp, stTemp, stMask, name, namefile, memberID} = req.body;

        if(req.files){
            fs.access("./public/picture/", (error) => {
                if (error) {
                    fs.mkdirSync("./public/picture/");
                }
            });
            const buffer = req.files.picture.data
            const originalname = req.files.picture.name
            const fileName = originalname.replace(/\s/g, '');
            const filterFileName = fileName.replace(/\.[^/.]+$/, "");
            const date = moment().format('YYYY-MM-DD-hh-mm-ss');
            const ref = date+'-'+filterFileName.toLowerCase()+'-visitor.webp';
            await sharp(buffer)
                .webp({ quality: 20 })
                .toFile("./public/picture/" + ref);
            url = `/public/picture/${ref}`;

            const newVisitor = new Visitor({datetime, deviceID, temp, stTemp, stMask, name, namefile, memberID, pictureURL: url})
            await newVisitor.save()

            res.json({message: 'Visitor successfully recorded!'})
        }
        else{
            throw 'File not found!'
        }

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getVisitors = async (req, res, next) => {
    try {
        const visitors = await Visitor.find().sort({createdAt: -1})
        res.json(visitors)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getCountVisitors = async (req, res, next) => {
    try {
        let visitors = await Visitor.find()
        if(req.query.status){
            visitors = await Visitor.find({stTemp: req.query.status})
        }
        res.json(visitors.length)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getVisitorsByDeviceID = async (req, res, next) => {
    try {
        const deviceID = req.params.deviceID;
        const device = await Device.findOne({deviceID})
        if(!device){
            throw `Device with deviceID: ${deviceID} not found!`
        }
        const visitors = await Visitor.find({deviceID}).sort({createdAt: -1})
        res.json(visitors)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteVisitors = async (req, res, next) => {
    try {
        await Visitor.deleteMany()
        res.json({message: 'Visitors successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteVisitorsByDeviceID = async (req, res, next) => {
    try {
        const deviceID = req.params.deviceID;
        const device = await Device.findOne({deviceID})
        if(!device){
            throw `Device with deviceID: ${deviceID} not found!`
        }
        await Visitor.deleteMany({deviceID})
        res.json({message: 'Visitors successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createVisitor,
    getVisitors,
    getCountVisitors,
    getVisitorsByDeviceID,
    deleteVisitors,
    deleteVisitorsByDeviceID
}