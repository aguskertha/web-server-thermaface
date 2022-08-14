const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderLogin = async (req, res, next) => {
    try {
        res.render('Admin/login', {
            layout: 'layouts/main-auth'
        })
    } catch (error) {
        
    }
}
const renderRegister = async (req, res, next) => {
    try {
        res.render('Admin/register', {
            layout: 'layouts/main-auth'
        })
    } catch (error) {
        
    }
}

const login = async (req, res, next) => {
    try {

        const {email, password} = req.body
        if(req.body.admin){
            passport.authenticate('local', {
                successRedirect: '/admin/dashboard',
                failureRedirect: '/auth/login',
                failureFlash: true
            })(req, res, next);
        }
        else{
            try {
                const validate = await axios.post('/api/client/validate', {email, password})
                const session = req.session
                session.clientID = validate.data.clientID
                session.admin = validate.data.admin
                res.redirect('/');
            } catch (error) {
                
                res.render('Admin/login', {
                    layout: 'layouts/main-auth',
                    errors: [{message: error.response.data.message}],
                    email,
                    password
                })
            }   
        }
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const register = async (req, res, next) => {
    try {
        const {name, email, password, password2, phone, company, address, deviceID, deviceCode} = req.body;
        let errors = [];
        if(!name || !email || !password || !password2 || !phone || !deviceID || !deviceCode){
            errors.push({message: 'Please fill in all fields!'});
        }
        
        if(password !== password2){
            errors.push({message: 'Password not matched!'});
        }
        
        if(password.length < 6){
            errors.push({message: 'Password should be at least 6 characters!'});
        }

        try {
            await axios.get('/api/device/'+deviceID)
        } catch (error) {
            errors.push({message: `Device with deviceID: ${deviceID} not found!`});
        }
        if(errors.length > 0 ){
            res.render('Admin/register', {
                layout: 'layouts/main-auth',
                errors,
                name,
                email,
                password,
                password2,
                deviceID,
                deviceCode,
                phone,
                company,
                address
            });
        }
        else{
            const user = await User.findOne({email: email});
            if(user){
                errors.push({message: 'User already exist!'});
                res.render('Admin/register', {
                    layout: 'layouts/main-auth',
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    deviceID,
                    deviceCode,
                    phone,
                    company,
                    address
                });
            }
            else{
                const newUser = new User({name, email, password, phone, company, address, pictureURL: '/public/img/profile.png'});
                
                bcrypt.hash(password, 10, async (err, hashedPassword) => {
                    if(err){
                        errors.push({message: err});
                        res.render('Admin/register', {
                            layout: 'layouts/main-auth',
                            errors,
                            name,
                            email,
                            password,
                            password2,
                            deviceID,
                            deviceCode,
                            phone,
                            company,
                            address
                        });
                    }
                    else{
                        newUser.password = hashedPassword;
                        const user = await newUser.save();
                        // await axios.post('/api/device/status', {deviceID, status:true})
                        await axios.post('/api/device/status', {userID: user._id, deviceID, status:true})
                        req.flash('success_msg', 'You are now registered and can login!');
                        res.redirect('/auth/login');
                    }
                })
            }
        }

    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const updateProfileUser = async (req, res, next) => {
    try {
        const userData = req.user
        const {deviceID} = req.user
        const {name, email, phone, address, company} = req.body
        let errors = []
        const user = await User.findOne({email: email});

        const updateUser = async (req, res, userData) => {
            let url = userData.pictureURL
            if(req.files){
                fs.access("./public/picture/", (error) => {
                    if (error) {
                        fs.mkdirSync("./public/picture/");
                    }
                });
                const buffer = req.files.picture.data
                const originalname = req.files.picture.name
                const fileName = originalname.replace(/\s/g, '');
                const filterFileName = fileName.replace(/\.[^/.]+$/, "");
                const date = moment().format('YYYY-MM-DD-hh-mm-ss');
                const ref = date+'-'+filterFileName.toLowerCase()+'.webp';
                await sharp(buffer)
                    .webp({ quality: 20 })
                    .toFile("./public/picture/" + ref);
                url = `/public/picture/${ref}`;
            }
            userData.pictureURL = url
            userData.email = email
            userData.name = name
            userData.phone = phone
            userData.address = address
            userData.company = company
            await User.updateOne(
                { _id: ObjectID(userData._id) },
                {
                    $set: {
                        name,
                        email,
                        phone,
                        address,
                        company,
                        pictureURL: url
                    }
                }
            )
            req.flash('success_msg', 'Profile successfully updated!');
            res.render('Admin/profile',{
                layout: 'layouts/main',
                user: userData,
                name, 
                deviceID: userData.deviceID,
                pictureURL: url
            })
        }

        if(user){
            if(user.email !== userData.email){
                errors.push({message: 'Email already exist!'})
                res.render('Admin/profile',{
                    layout: 'layouts/main',
                    user: userData,
                    name, 
                    deviceID,
                    pictureURL: userData.pictureURL,
                    errors
                })
            }
            else{
                updateUser(req, res, userData)
            }
        }
        else{
            updateUser(req, res, userData)
        }

    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}


const logout = async (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) { return next(err); }
            req.flash('success_msg', 'You are logged out!');
            res.redirect('/auth/login');
        });
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}


module.exports = {
    renderLogin,
    renderRegister,
    register,
    login,
    logout,
    updateProfileUser
}