
const renderDevice = async (req, res, next) => {
    try {
        const {name, deviceID, pictureURL} = req.user
        res.render('Admin/device', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL
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