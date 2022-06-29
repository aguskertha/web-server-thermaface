const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const cartSchema = new Schema({
    clientID: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

cartSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

cartSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;