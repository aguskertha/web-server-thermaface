const router = require('express').Router()
const { sendMessage, renderMessage } = require('../controllers/message.controller')

router.post('/', sendMessage);
router.get('/', renderMessage);

module.exports = router