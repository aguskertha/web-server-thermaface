const router = require('express').Router();
const { renderDashboardPage, renderDashboardPage2 } = require('./../controllers/dashboard.controller');

router.get('/', renderDashboardPage);
router.get('/dua', renderDashboardPage2);

module.exports = router;