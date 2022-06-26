
const router = require('express').Router();
const { createVisitor } = require('./../controllers/visitor.controller')

router.post('/', createVisitor);

module.exports = router;
