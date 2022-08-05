
const router = require('express').Router()
const { createProduct, getProducts, getProductByID, deleteProducts, deleteProductByID } = require('./../controllers/product.controller')

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:productID', getProductByID)
router.delete('/', deleteProducts)
router.get('/delete/:productID', deleteProductByID)

module.exports = router