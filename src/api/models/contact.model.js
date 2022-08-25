const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
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

contactSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

contactSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;