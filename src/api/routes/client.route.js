const router = require('express').Router()
const { createClient, validateClient} = require('./../controllers/client.controller')

router.post('/', createClient)
router.get('/validate', validateClient)

module.exports = router
