const router = require('express').Router();
const { renderDashboard } = require('./../controllers/dashboard.controller')
const {ensureAuthenticated} = require('./../middleware/auth');
router.get('/dashboard', ensureAuthenticated,  renderDashboard);
module.exports = router;
