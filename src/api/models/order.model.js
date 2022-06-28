const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const orderSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true
    },
    transferImageURL: {
        type: String,
    },
    clientID: {
        type: String,
        required: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

orderSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

orderSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;