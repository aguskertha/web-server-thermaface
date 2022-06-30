const router = require('express').Router()
const { renderOrder, order, getCitys, getCosts, renderOrderList, uploadPayment, updateOrderReceipt } = require('./../controllers/order.controller')

router.post('/payment', uploadPayment)
router.get('/', renderOrder)
router.get('/list', renderOrderList)
router.post('/', order)
router.get('/province/:provinceID', getCitys)
router.post('/costs', getCosts)
router.post('/receipt', updateOrderReceipt)

module.exports = router