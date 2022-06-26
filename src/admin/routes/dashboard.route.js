const router = require('express').Router();
const { renderDashboard } = require('./../controllers/dashboard.controller')

router.get('/dashboard',  renderDashboard);


// router.get('/dashboard', async (req, res, next) => {
//     try {
//         res.send('ss')
//     } catch (error) {
        
//     }
// })

module.exports = router;
