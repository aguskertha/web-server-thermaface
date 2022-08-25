const router = require('express').Router()
const { createLog, getLogs, getLogByName, updateCounter, deleteLogs } = require('../controllers/log.controller.')

router.post('/', createLog)
router.get('/', getLogs)
router.get('/:name', getLogByName)
router.post('/update', updateCounter)
router.delete('/', deleteLogs)

module.exports = router
