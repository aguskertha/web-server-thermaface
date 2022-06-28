const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderDevice = async (req, res, next) => {
    try {
        const {name, deviceID, pictureURL} = req.user
        const device = await axios.get('/api/device/'+deviceID)
        

        res.render('Admin/device', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            device: device.data
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
    renderDevice
}