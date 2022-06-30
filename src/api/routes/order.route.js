const router = require('express').Router()
const { createOrder, getOrders, getOrdersByClientID, getDeliveryOrderByID, getProductsOrderByID } = require('./../controllers/order.controller')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/client/:clientID', getOrdersByClientID)
router.get('/delivery/:orderID', getDeliveryOrderByID)
router.get('/product/:orderID', getProductsOrderByID)

module.exports = router