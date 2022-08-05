const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const renderProductPage = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            let products = await axios.get('/api/product/')
            products = products.data
            res.render('Product/product-list', {
                layout: 'layouts/main-auth',
                products
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

const renderCreateProductPage = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            res.render('Product/product-create', {
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

const createProduct = async (req, res, next) => {
    try {
        if(req.session.clientID && req.session.admin){
            const {name, price, stock, description} = req.body
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
                const ref = date+'-'+filterFileName.toLowerCase()+'-product.webp';
                await sharp(buffer)
                    .webp({ quality: 20 })
                    .toFile("./public/picture/" + ref);
                url = `/public/picture/${ref}`;
                const product = {
                    name,
                    price,
                    stock,
                    description,
                    imageURL: url
                }
                const result = await axios.post('/api/product/', product)
                if(result.status == 200){
                    req.flash('success_msg', result.data.message);
                    res.redirect('/product/')
                }
                else{
                    errors.push({message: 'Failed Create!'})
                    res.render('Product/product-create', {
                        layout: 'layouts/main-auth',
                        errors
                    })
                }
            }
            else{
                errors.push({message: 'Failed Create!'})
                res.render('Product/product-create', {
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

const deleteProduct = async (req, res, next) =>{
    try {
        if(req.session.clientID && req.session.admin){
            const productID = req.params.productID
            const result = await axios.get('/api/product/delete/'+productID)
            if(result.status == 200){
                req.flash('success_msg', result.data.message);
                res.redirect('/product/')
            }
            else{
                errors.push({message: 'Failed Delete!'})
                res.render('Product/product-list', {
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
    renderProductPage,
    renderCreateProductPage,
    createProduct,
    deleteProduct
}