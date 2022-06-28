const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderVisitor = async (req, res, next) => {
    try {
        const {name, deviceID, pictureURL} = req.user
        
        const visitors = await axios.get('/api/visitor/device/'+deviceID)
        const countNormalVisitors = await axios.get('/api/visitor/device/'+deviceID+'/count?status=NORMAL')
        const countAbnormalVisitors = await axios.get('/api/visitor/device/'+deviceID+'/count?status=ABNORMAL')
        const countAllVisitors = await axios.get('/api/visitor/device/'+deviceID+'/count')
        
        res.render('Admin/visitor', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            visitors : visitors.data,
            countNormalVisitors: countNormalVisitors.data,
            countAbnormalVisitors: countAbnormalVisitors.data,
            countAllVisitors: countAllVisitors.data
        })
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main',
            message: error,
            status: 400
        });
    }
}

module.exports = {
    renderVisitor
}