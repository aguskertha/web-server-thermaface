const router = require('express').Router()
const { createClient, validateClient, getClientByEmail, getClientByID} = require('./../controllers/client.controller')

router.post('/', createClient)
router.get('/:clientID', getClientByID)
router.get('/email/:email', getClientByEmail)
router.post('/validate', validateClient)

module.exports = router
