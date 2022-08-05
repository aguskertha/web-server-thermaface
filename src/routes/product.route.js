const router = require('express').Router()
const { renderProductPage, renderCreateProductPage, createProduct, deleteProduct } = require('./../controllers/product.controller')

router.get('/', renderProductPage)
router.get('/create', renderCreateProductPage)
router.get('/delete/:productID', deleteProduct)
router.post('/', createProduct)

module.exports = router