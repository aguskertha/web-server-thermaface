const router = require('express').Router()
const { createOrder, getOrders, getOrdersByClientID, getDeliveryOrderByID, getProductsOrderByID, uploadPaymentOrderByID, approveOrder, updateOrderReceipt } = require('./../controllers/order.controller')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/client/:clientID', getOrdersByClientID)
router.get('/delivery/:orderID', getDeliveryOrderByID)
router.get('/product/:orderID', getProductsOrderByID)
router.post('/payment/:orderID', uploadPaymentOrderByID)
router.get('/approve/:orderID', approveOrder)
router.post('/receipt/:orderID', updateOrderReceipt)

module.exports = router