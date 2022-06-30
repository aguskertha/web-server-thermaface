const router = require('express').Router()
const { createOrder, getOrders, getOrdersByClientID, getDeliveryOrderByID, getProductsOrderByID, uploadPaymentOrderByID } = require('./../controllers/order.controller')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/client/:clientID', getOrdersByClientID)
router.get('/delivery/:orderID', getDeliveryOrderByID)
router.get('/product/:orderID', getProductsOrderByID)
router.post('/payment/:orderID', uploadPaymentOrderByID)

module.exports = router