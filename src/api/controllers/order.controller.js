const Order = require('../models/order.model')
const Product = require('../models/product.model')
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const createOrder = async (req, res, next) => {
    try {
        let {email, password, productID, quantity } = req.body
        let paymentStatus = 0

        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Product nor found!'
        }

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if(err){
                throw err
            }
            else{
                password = hashedPassword;

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
                    const newOrder = new Order({email, password, product, quantity, paymentStatus, transferImageURL: url })
                    await newOrder.save()
        
                    res.json({message: 'Order successfully created!'})
                }
                else{
                    const newOrder = new Order({email, password, product, quantity, paymentStatus})
                    await newOrder.save()
        
                    res.json({message: 'Order successfully created!'})
                }
                
            }
        })

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createOrder
}