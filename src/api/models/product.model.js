const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

productSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

productSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;