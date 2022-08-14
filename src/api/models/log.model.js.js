const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const logSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    counter: {
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

logSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

logSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;