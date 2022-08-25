
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const renderMessage = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            let messages = await axios.get('/api/contact/')
            messages = messages.data
            res.render('Message/message-list', {
                layout: 'layouts/main-auth',
                messages
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

const sendMessage = async (req, res, next) => {
    try {
        const {name, email, subject, message} = req.body
        result = await axios.post('/api/contact/', {name, email, subject, message})
        if(result.status == 200){
            req.flash('success_msg', result.data.message);
            res.redirect('/')
        }
        else{
        }
    } catch (error) {
        req.flash('error_msg', error.response.data.message);
        res.redirect('/')
    }
}

module.exports = {
    renderMessage,
    sendMessage
}