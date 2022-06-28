const Order = require('../models/order.model')
const Product = require('../models/product.model')
const Client = require('./../models/client.model')
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const createOrder = async (req, res, next) => {
    try {
        let {productID, quantity, address, phone, postalCode, clientID } = req.body
        let paymentStatus = 0
        
        const client = await Client.findOne({_id: ObjectID(clientID)})
        if(!client){
            throw 'Client not found!'
        }

        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Product not found!'
        }
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
            const ref = date+'-'+filterFileName.toLowerCase()+'-transfer.webp';
            await sharp(buffer)
                .webp({ quality: 20 })
                .toFile("./public/picture/" + ref);
            url = `/public/picture/${ref}`;
            paymentStatus = 1
            const newOrder = new Order({product, quantity, address, phone, postalCode, clientID, paymentStatus, transferImageURL: url })
            await newOrder.save()

            res.json({message: 'Order successfully created!'})
        }
        else{
            const newOrder = new Order({product, quantity, address, phone, postalCode, clientID, paymentStatus})
            await newOrder.save()

            res.json({message: 'Order successfully created!'})
        }

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort({createdAt: -1})
        res.json(orders)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOrdersByClientID = async (req, res, next) => {
    try {
        const clientID = req.params.clientID
        const client = await Client.findOne({_id: ObjectID(clientID)})
        if(!client){
            throw 'Client not found!'
        }
        const orders = await Order.find({clientID}).sort({createdAt: -1})
        res.json(orders)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrdersByClientID
}