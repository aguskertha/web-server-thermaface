
const router = require('express').Router()
const { createProduct, getProducts, getProductByID, deleteProducts } = require('./../controllers/product.controller')

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:productID', getProductByID)
router.delete('/', deleteProducts)

module.exports = router