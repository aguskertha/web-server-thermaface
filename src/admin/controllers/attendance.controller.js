
const renderAttendance = async (req, res, next) => {
    try {
        const {name, deviceID, pictureURL} = req.user
        res.render('Admin/attendance', {
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
    renderAttendance
}