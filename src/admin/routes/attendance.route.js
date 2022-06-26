const router = require('express').Router();
const { renderAttendance } = require('./../controllers/attendance.controller')

router.get('/attendance',  renderAttendance);

module.exports = router;
