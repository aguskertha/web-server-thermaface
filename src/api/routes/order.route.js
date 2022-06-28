const router = require('express').Router()
const { createOrder, getOrders, getOrdersByClientID } = require('./../controllers/order.controller')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:clientID', getOrdersByClientID)

module.exports = router