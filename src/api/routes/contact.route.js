const router = require('express').Router()
const { createContact, getContacts } = require('./../controllers/contact.controller')

router.post('/', createContact)
router.get('/', getContacts)

module.exports = router
