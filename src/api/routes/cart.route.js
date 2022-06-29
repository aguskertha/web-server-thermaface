
const router = require('express').Router()
const { createCart, updateCartQuantity, deleteCartByID, getCartsByClientID } = require('./../controllers/cart.controller')

router.post('/', createCart)
router.get('/client/:clientID', getCartsByClientID)
router.post('/update/quantity', updateCartQuantity)
router.delete('/:cartID', deleteCartByID)

module.exports = router