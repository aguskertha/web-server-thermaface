const router = require('express').Router();
const { renderVisitor } = require('../controllers/visitor.controller')

router.get('/visitor',  renderVisitor);

module.exports = router;
