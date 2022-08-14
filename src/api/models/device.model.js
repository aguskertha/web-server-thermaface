const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const deviceSchema = new Schema({
    deviceID: {
        type: String,
        required: true,
        unique: true
    },
    deviceCode: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

deviceSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

deviceSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;