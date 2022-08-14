const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderDevice = async (req, res, next) => {
    try {
        const {_id, name, deviceID, pictureURL} = req.user
        const devices = await axios.get('/api/device/user/'+_id)
        

        res.render('Admin/device', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            devices: devices.data
        })
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main',
            message: error,
            status: 400
        });
    }
}

const assignDevice = async (req, res, next) => {
    try {
        const userID = req.user._id
        const deviceID = req.body.deviceID
        const status = true
        const result = await axios.post('/api/device/status', {userID,deviceID, status})
        if(result.status == 200){
            req.flash('success_msg', result.data.message);
            res.redirect('/admin/device/')
        }
        else{
            const errors = []
            errors.push({message: 'Failed Create!'})
            const {_id, name, deviceID, pictureURL} = req.user
            const devices = await axios.get('/api/device/user/'+_id)

            res.render('Admin/device', {
                layout: 'layouts/main',
                name,
                deviceID,
                pictureURL,
                devices: devices.data,
                errors
            })
        }
    } catch (error) {
        const errors = []
        const {_id, name, deviceID, pictureURL} = req.user
        const devices = await axios.get('/api/device/user/'+_id)

        res.render('Admin/device', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            devices: devices.data,
            errors
        })
    }
}

module.exports = {
    renderDevice,
    assignDevice
}