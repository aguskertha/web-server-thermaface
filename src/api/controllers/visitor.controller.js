const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const Visitor = require('./../models/visitor.model')

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

module.exports = {
    createVisitor
}