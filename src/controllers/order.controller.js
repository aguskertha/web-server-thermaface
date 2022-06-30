const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
const axiosRaja = axiosLib.create({baseURL: process.env.RAJA_HOST});
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const couriers = [
    {
        name: 'JNE',
        code: 'jne'
    },
    {
        name: 'Pos Indonesia',
        code: 'pos'
    },
    {
        name: 'TIKI',
        code: 'tiki'
    }
]

const renderOrder = async (req, res, next) => {
    try {
        const clientID = req.session.clientID
        let provinces = await axiosRaja.get('/province',{
            headers : {
                key: process.env.RAJA_KEY
            }
        })
        provinces = provinces.data.rajaongkir.results
        let client = null
        let carts = []
        let total = 0
        if(req.session.clientID){
            client = await axios.get('/api/client/'+clientID)
            client = client.data
            carts = await axios.get('/api/cart/client/'+clientID)
            carts = carts.data
            carts.forEach(cart => {
                total += (cart.quantity * cart.price)
            });
        }
        else{
            res.redirect('/')
        }
        if(carts.length == 0){
            res.redirect('/')
        }
        res.render('order', {
            layout: 'layouts/main-auth',
            client: client,
            carts: carts,
            total,
            provinces,
            couriers
        })
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-auth',
            message: error,
            status: 400
        });
    }
}

const order = async (req, res, next) => {
    try {
        let {province, city, courier, service, address, postalCode, name, phone, total} = req.body
        
        
        if(req.session.clientID){
            
            let provinces = await axiosRaja.get('/province',{
                headers : {
                    key: process.env.RAJA_KEY
                }
            })
            provinces = provinces.data.rajaongkir.results
            let client = null
            let carts = []
            let totalOrder = total
            let totalPorductPrice = 0
            client = await axios.get('/api/client/'+req.session.clientID)
            client = client.data
            carts = await axios.get('/api/cart/client/'+req.session.clientID)
            carts = carts.data
            carts.forEach(cart => {
                totalPorductPrice += (cart.quantity * cart.price)
            });

            let errors = [];
            if(!province || !city || !courier || !service ){
                errors.push({message: 'Please fill in all fields!'});
            }
            
            if(errors.length > 0 ){
                res.render('order', {
                    layout: 'layouts/main-auth',
                    errors,
                    address,
                    postalCode,
                    name,
                    phone,
                    client: client,
                    carts: carts,
                    total: totalPorductPrice,
                    provinces,
                    couriers
                });
            }
            province = await axiosRaja.get('/province?id='+Number(province), {
                headers : {
                    key: process.env.RAJA_KEY
                }
            })
            province = province.data.rajaongkir.results
    
            city = await axiosRaja.get(`/city?province=${province.province_id}&id=${city}`, {
                headers : {
                    key: process.env.RAJA_KEY
                }
            })
            city = city.data.rajaongkir.results
    
            let results = couriers.find(data => data.code === courier)
            courier = results
    
            const arr = service.split(';')
            service = {
                name: arr[0],
                price: arr[1]
            }
            
            const order = {
                province,
                city,
                courier,
                service,
                address,
                postalCode,
                name,
                phone,
                carts,
                total: totalOrder,
                clientID: req.session.clientID

            }
            const result = await axios.post('/api/order', order)
            if(result.status == 200){
                res.redirect('/order/list')
            }
            else{
                errors.push({message: 'Failed Order'})
                res.render('order', {
                    layout: 'layouts/main-auth',
                    errors,
                    address,
                    postalCode,
                    name,
                    phone,
                    client: client,
                    carts: carts,
                    total: totalPorductPrice,
                    provinces,
                    couriers
                });
            }
        }
        else{
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getCitys = async (req, res ,next)=> {
    try {
        const provinceID = req.params.provinceID 
        let citys = await axiosRaja.get('/city?province='+provinceID,{
            headers : {
                key: process.env.RAJA_KEY
            }
        })
        citys = citys.data.rajaongkir.results
        res.json(citys)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getCosts = async (req, res, next) => {
    try {
        const {origin, destination, weight, courier} = req.body
        let costs = await axiosRaja.post('/cost',{
            origin: origin,
            destination,
            weight,
            courier
        },{
            headers : {
                key: process.env.RAJA_KEY
            }
        })
        costs = costs.data.rajaongkir.results[0].costs
        res.json(costs)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const renderOrderList = async (req, res, next) => {
    try {

        if(req.session.clientID){
            let client = await axios.get('/api/client/'+req.session.clientID)
            client = client.data
            let username = client.email
            const arr = username.split('@')
            username = arr[0]
            let orders = await axios.get('/api/order/client/'+req.session.clientID)
            orders = orders.data
            res.render('order-list', {
                layout: 'layouts/main-auth',
                orders,
                client,
                username
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


const uploadPayment = async (req, res, next) => {
    try {
        const orderID = req.body.orderID
        if(req.session.clientID){
            let client = await axios.get('/api/client/'+req.session.clientID)
            client = client.data
            let username = client.email
            const arr = username.split('@')
            username = arr[0]
            let orders = await axios.get('/api/order/client/'+req.session.clientID)
            orders = orders.data
            let errors = []
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
                const ref = date+'-'+filterFileName.toLowerCase()+'-transfer.webp';
                await sharp(buffer)
                    .webp({ quality: 20 })
                    .toFile("./public/picture/" + ref);
                url = `/public/picture/${ref}`;
                const result = await axios.post('/api/order/payment/'+orderID, {transferImageURL: url})
                if(result.status == 200){
                    res.redirect('/order/list')
                }
                else{
                    errors.push({message: 'Failed Upload'})
                    res.render('order-list', {
                        layout: 'layouts/main-auth',
                        orders,
                        client,
                        username,
                        errors
                    })
                }

            }
            else{
                errors.push({message: 'File not found!'})
                res.render('order-list', {
                    layout: 'layouts/main-auth',
                    orders,
                    client,
                    username,
                    errors
                })
            }
        }
        else{
            res.redirect('/')
        }
    } catch (error) {
        
    }
}

module.exports = {
    renderOrder,
    order,
    getCitys,
    getCosts,
    renderOrderList,
    uploadPayment
}