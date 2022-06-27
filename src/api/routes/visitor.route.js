
const router = require('express').Router();
const { createVisitor, getVisitors, getCountVisitors } = require('./../controllers/visitor.controller')

router.post('/', createVisitor);
router.get('/', getVisitors);
router.get('/count', getCountVisitors);

module.exports = router;
