
const renderDashboard = async (req, res, next) => {
    try {
        const {name, deviceID} = req.user
        res.render('Admin/dashboard', {
            layout: 'layouts/main',
            name,
            deviceID
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
    renderDashboard
}