const router = require('express').Router()
const { renderOrder, order, getCitys, getCosts } = require('./../controllers/order.controller')

router.get('/', renderOrder)
router.post('/', order)
router.get('/province/:provinceID', getCitys)
router.post('/costs', getCosts)

module.exports = router