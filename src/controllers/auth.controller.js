const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ObjectID = require('mongodb').ObjectId;

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
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res, next);
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
        const {name, email, password, password2, phone, deviceID, deviceCode} = req.body;
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
                phone
            });
        }
        else{
            const user = await User.findOne({email: email});
            console.log(user)
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
                    phone
                });
            }
            else{
                const newUser = new User({name, email, password, phone, deviceID, deviceCode});
                
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
                            phone
                        });
                    }
                    else{
                        newUser.password = hashedPassword;
                        await newUser.save();
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
    logout
}