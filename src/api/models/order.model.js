const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const orderSchema = new Schema({
    province: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    courier: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    carts: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    clientID: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true
    },
    transferImageURL: {
        type: String,
    },
    courierReceiptImageURL: {
        type: String,
    },
    courierReceiptNumber: {
        type: String,
    },
    approve: {
        type: Boolean,
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