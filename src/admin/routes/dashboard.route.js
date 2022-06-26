const router = require('express').Router();
const { renderDashboard } = require('./../controllers/dashboard.controller')

router.get('/dashboard',  renderDashboard);

module.exports = router;
