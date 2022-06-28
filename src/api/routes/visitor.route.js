
const router = require('express').Router();
const { createVisitor, getVisitors, getCountVisitors, getVisitorsByDeviceID, deleteVisitors, deleteVisitorsByDeviceID, getCountVisitorsByDeviceID } = require('./../controllers/visitor.controller')

router.post('/', createVisitor);
router.get('/', getVisitors);
router.get('/device/:deviceID', getVisitorsByDeviceID);
router.get('/count', getCountVisitors);
router.get('/device/:deviceID/count', getCountVisitorsByDeviceID);
router.delete('/', deleteVisitors);
router.delete('/device/:deviceID', deleteVisitorsByDeviceID);

module.exports = router;
