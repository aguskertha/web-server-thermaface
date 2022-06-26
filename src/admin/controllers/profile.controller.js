
const renderProfile = async (req, res, next) => {
    try {
        const {name, deviceID, pictureURL} = req.user
        const user = req.user
        res.render('Admin/profile', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            user
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
    renderProfile
}