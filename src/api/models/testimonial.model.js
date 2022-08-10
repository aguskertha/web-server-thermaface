const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const testimonialSchema = new Schema({
    orderID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'orders'
    },
    rate: {
        type: Number,
        required: true,
    },
    message: {
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

testimonialSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

testimonialSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;