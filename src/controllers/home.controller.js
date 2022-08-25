const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
const bcrypt = require('bcryptjs');

const validAdmin = [
    'admin@admin.com',
    'jaguar@admin.com'
]

const index = async (req, res, next) => {
    try {
        
        const products = await axios.get('/api/product')
        const clientID = req.session.clientID
        let logs = await axios.get('/api/log/')
        let orders = await axios.get('/api/order')
        let testimonials = await axios.get('/api/testimonial')
        let client = null
        let carts = []
        let cartCount = 0
        let admin = false
        if(req.session.clientID){
            client = await axios.get('/api/client/'+clientID)
            client = client.data
            carts = await axios.get('/api/cart/client/'+clientID)
            carts = carts.data
            carts.forEach(cart => {
                cartCount += cart.quantity
            });
            if(!req.session.admin){
                try {
                    let log = await axios.get('/api/log/localhost')
                    
                    let counter = Number(log.data.counter)+1;
                    const result = await axios.post('/api/log/update', {name:'localhost', counter})
                } catch (error) {
                    await axios.post('/api/log/', {name:'localhost'})
                }
            }
        }
        if(req.session.admin){
            admin = true
        }
        console.log(testimonials.data[0].orders)
        res.render('index', {
            layout: 'layouts/main-home',
            products: products.data,
            client: client,
            carts: carts,
            cartCount,
            admin,
            logCount: logs.data[0].counter,
            orderCount: orders.data.length,
            productCount: products.data.length,
            testiCount: testimonials.data.length,
            testimonials : testimonials.data
        })
    } catch (error) {
        
    }
}

const renderClientPage = async (req, res, next) => {
    try {
        const productID = req.body.productID
        res.render('client', {
            layout: 'layouts/main-home',
            productID
        })
    } catch (error) {
        
    }
}

const renderRegisterClient = async (req, res, next) => {
    try {
        res.render('register-client', {
            layout: 'layouts/main-auth',
        })
    } catch (error) {
        
    }
}

const registerClient = async (req, res, next) => {
    try {
        const {email, password, password2} = req.body;
        let errors = [];
        let admin = false
        if(!email || !password || !password2){
            errors.push({message: 'Please fill in all fields!'});
        }
        
        if(password !== password2){
            errors.push({message: 'Password not matched!'});
        }
        
        if(password.length < 6){
            errors.push({message: 'Password should be at least 6 characters!'});
        }

        if(errors.length > 0 ){
            res.render('register-client', {
                layout: 'layouts/main-auth',
                errors,
                email,
                password,
                password2,
            });
        }
        else{
            const data = validAdmin.find(admin => admin == email)
            if(data != undefined){
                admin = true
            }
            const client = await axios.get('/api/client/email/'+email)
            if(client.data){
                errors.push({message: 'Client already exist!'});
                res.render('register-client', {
                    layout: 'layouts/main-auth',
                    errors,
                    email,
                    password,
                    password2,
                });
            }
            else{

                const hashPassword = await bcrypt.hash(password, 10)
                console.log(hashPassword)
                const newClient = await axios.post('/api/client', {
                    email,
                    password,
                    admin
                })
                if(newClient.data){
                    // res.render('Admin/login', {
                    //     layout: 'layouts/main-auth',
                    // })
                    res.redirect('/auth/login')
                }else{
                    console.log(newClient)
                    throw 'Fail'
                }
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
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

module.exports = {
    index,
    renderClientPage,
    renderRegisterClient,
    registerClient,
    logout,
}