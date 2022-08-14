const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const renderDevicePage = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            let devices = await axios.get('/api/device/')
            devices = devices.data
            res.render('Device/device-list', {
                layout: 'layouts/main-auth',
                devices
            })
        }
        else{
            res.redirect('/')
        }

    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const renderCreateDevicePage = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            res.render('Device/device-create', {
                layout: 'layouts/main-auth',
            })
        }
        else{
            res.redirect('/')
        }

    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const createDevice = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            const {name, deviceID, deviceCode} = req.body
            const result = await axios.post('/api/device/', {name, deviceID, deviceCode})
            if(result.status == 200){
                req.flash('success_msg', result.data.message);
                res.redirect('/device/')
            }
            else{
                errors.push({message: 'Failed Create!'})
                res.render('Device/device-create', {
                    layout: 'layouts/main-auth',
                    errors
                })
            }
        }
        else{
            res.redirect('/')
        }
        
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const deleteDevice = async (req, res, next) =>{
    try {
        if(req.session.clientID && req.session.admin){
            const deviceID = req.params.deviceID
            const result = await axios.delete('/api/device/'+deviceID)
            if(result.status == 200){
                req.flash('success_msg', result.data.message);
                res.redirect('/device/')
            }
            else{
                errors.push({message: 'Failed Delete!'})
                res.render('Device/device-list', {
                    layout: 'layouts/main-auth',
                    errors
                })
            }
        }
        else{
            res.redirect('/')
        }
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

module.exports = {
    renderDevicePage,
    renderCreateDevicePage,
    createDevice,
    deleteDevice
}