const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const clientSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

clientSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

clientSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;