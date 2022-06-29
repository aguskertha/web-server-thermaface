const Cart = require('./../models/cart.model')
const Client = require('./../models/client.model')
const Product = require('./../models/product.model')
const ObjectID = require('mongodb').ObjectId;

const createCart = async (req, res, next) => {
    try {
        const {clientID, productID, quantity} = req.body
        const client = await Client.findOne({_id: ObjectID(clientID)})
        if(!client){
            throw 'Client not found!'
        }
        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Prodcut not found!'
        }

        const newCart = new Cart({clientID, product, quantity})
        await newCart.save()
        res.json({message: 'Cart Successfully created!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const updateCartQuantity = async (req, res, next) => {
    try {
        const {cartID, quantity} = req.body
        const cart = await Cart.findOne({_id: ObjectID(cartID)})
        if(!cart){
            throw 'Cart not found!'
        }
        await Cart.updateOne(
            {_id: cartID},
            {
                $set: {
                    quantity: quantity
                }
            }
        )
        res.json({message: 'Cart Quantity Successfully updated!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteCartByID = async (req, res, next) => {
    try {
        const cartID = req.params.cartID
        const cart = await Cart.findOne({_id: ObjectID(cartID)})
        if(!cart){
            throw 'Cart not found!'
        }
        await Cart.deleteOne({_id: ObjectID(cartID)})
        res.json({message: 'Cart Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getCartsByClientID = async (req, res, next) => {
    try {
        const clientID = req.params.clientID
        const client = await Client.findOne({_id: ObjectID(clientID)})
        if(!client){
            throw 'Client not found!'
        }
        const carts = await Cart.find({clientID}).sort({createdAt: -1})
        res.json(carts)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createCart,
    updateCartQuantity,
    deleteCartByID,
    getCartsByClientID
}