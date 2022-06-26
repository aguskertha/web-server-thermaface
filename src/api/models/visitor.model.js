const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const visitorSchema = new Schema({
    datetime: {
        type: String,
        required: true
    },
    deviceID: {
        type: String,
        required: true
    },
    temp: {
        type: String,
        required: true
    },
    stTemp: {
        type: String,
        required: true
    },
    stMask: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    namefile: {
        type: String,
        required: true
    },
    memberID: {
        type: String,
        required: true
    },
    pictureURL: {
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

visitorSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

visitorSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;