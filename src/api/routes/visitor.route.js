
const router = require('express').Router();
const { createVisitor, getVisitors } = require('./../controllers/visitor.controller')

router.post('/', createVisitor);
router.get('/', getVisitors);

module.exports = router;
