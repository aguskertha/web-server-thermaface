const Product = require('./../models/product.model')
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const createProduct = async (req, res, next) => {
    try {
        const {name, price, stock, description, imageURL} = req.body
        const newProduct = new Product({name, price, stock, description, imageURL})
        await newProduct.save()

        res.json({message: 'Product successfully created!'})
        // if(req.files){
        //     fs.access("./public/picture/", (error) => {
        //         if (error) {
        //             fs.mkdirSync("./public/picture/");
        //         }
        //     });
        //     const buffer = req.files.picture.data
        //     const originalname = req.files.picture.name
        //     const fileName = originalname.replace(/\s/g, '');
        //     const filterFileName = fileName.replace(/\.[^/.]+$/, "");
        //     const date = moment().format('YYYY-MM-DD-hh-mm-ss');
        //     const ref = date+'-'+filterFileName.toLowerCase()+'-product.webp';
        //     await sharp(buffer)
        //         .webp({ quality: 20 })
        //         .toFile("./public/picture/" + ref);
        //     url = `/public/picture/${ref}`;

        //     const newProduct = new Product({name, price, stock, description, imageURL: url})
        //     await newProduct.save()

        //     res.json({message: 'Product successfully created!'})
        // }
        // else{
        //     throw 'File not found!'
        // }
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({createdAt: -1})
        res.json(products)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getProductByID = async (req, res, next) => {
    try {
        const productID = req.params.productID
        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Product not found!'
        }
        res.json(product)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteProducts = async (req, res, next) => {
    try {
        await Product.deleteMany()
        res.json({message: 'Products successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteProductByID = async (req, res, next) => {
    try {
        const productID = req.params.productID
        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Product not found!'
        }
        await Product.deleteOne({_id: ObjectID(productID)})
        res.json({message: 'Products successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    deleteProducts,
    deleteProductByID
}