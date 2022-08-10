const router = require('express').Router()
const { renderOrder, order, getCitys, getCosts, renderOrderList, uploadPayment, updateOrderReceipt, renderOrderDetail, sendTestimonial } = require('./../controllers/order.controller')

router.post('/payment', uploadPayment)
router.get('/', renderOrder)
router.get('/list', renderOrderList)
router.post('/', order)
router.get('/province/:provinceID', getCitys)
router.post('/costs', getCosts)
router.post('/receipt', updateOrderReceipt)
router.post('/testi', sendTestimonial)
router.get('/detail/:orderID', renderOrderDetail)

module.exports = router