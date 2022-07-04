const Order = require('../models/order.model')
const Product = require('../models/product.model')
const Client = require('./../models/client.model')
const Cart = require('./../models/cart.model')
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const createOrder = async (req, res, next) => {
    try {
        let {province,city,courier,service,address,postalCode,name,phone,carts,total,clientID} = req.body
        let paymentStatus = 0
        let transferImageURL = ''
        let courierReceiptNumber = ''
        let approve = false
        const client = await Client.findOne({_id: ObjectID(clientID)})
        if(!client){
            throw 'Client not found!'
        }

        const order = {
            province,
                city,
                courier,
                service,
                address,
                postalCode,
                name,
                phone,
                carts,
                total,
                clientID,
                paymentStatus,
                approve,
                transferImageURL,
                courierReceiptNumber
        }

        const newOrder = new Order(order)
        newOrder.save()

        await Cart.deleteMany({clientID: clientID})

        res.json({message: 'Order Successfully created!'})

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

const getDeliveryOrderByID = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }
        let courierReceiptNumber = ''
        if(order.courierReceiptNumber){
            courierReceiptNumber = order.courierReceiptNumber
        }
        const delivery = {
            courier: order.courier,
            service: order.service,
            courierReceiptNumber
        }

        res.json(delivery)

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getProductsOrderByID = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }

        const products = order.carts
        res.json(products)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const uploadPaymentOrderByID = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const {transferImageURL} = req.body
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }

        await Order.updateOne(
            { _id: ObjectID(orderID) },
            {
                $set: {
                    transferImageURL: transferImageURL,
                    paymentStatus: 1
                }
            }
        )

        res.json({message: 'Upload transfer successfully!'})

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const approveOrder = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }

        let promises = []

        const updateProductStock = async (cart) => {
            const productID = cart.product._id
            await Product.updateOne(
                {_id: ObjectID(productID)},
                {
                    $set: {
                        stock: Number(cart.product.stock) - Number(cart.quantity)
                    }
                }
            )
        }

        order.carts.forEach(cart => {
            promises.push(updateProductStock(cart))
        });

        await Promise.all(promises)

        await Order.updateOne(
            { _id: ObjectID(orderID) },
            {
                $set: {
                    approve: true,
                    paymentStatus: 2
                }
            }
        )

        res.json({message: 'Order approved successfully!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const updateOrderReceipt = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const courierReceiptNumber = req.body.courierReceiptNumber
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }
        await Order.updateOne(
            { _id: ObjectID(orderID) },
            {
                $set: {
                    paymentStatus: 3,
                    courierReceiptNumber
                }
            }
        )

        res.json({message: 'Receipt Order successfully updated!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOrderByID = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }
        res.json(order)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const updateOrderPaymentStatus = async (req, res, next) => {
    try {
        const orderID = req.params.orderID
        const paymentStatus = req.query.status
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order){
            throw 'Order not found!'
        }
        await Order.updateOne(
            { _id: ObjectID(orderID) },
            {
                $set: {
                    paymentStatus: paymentStatus,
                }
            }
        )

        res.json({message: 'Status Order successfully updated!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrdersByClientID,
    getDeliveryOrderByID,
    getProductsOrderByID,
    uploadPaymentOrderByID,
    approveOrder,
    updateOrderReceipt,
    getOrderByID,
    updateOrderPaymentStatus
}