
const renderDashboardPage = async (req, res, next) => {
    try {
        res.render('Dashboard/dashboard', {
            layout: 'layouts/main-layout',
            title: 'Dashboard'
        })
    } catch (error) {
        const err = {
            status: 400,
            message: error.toString()
        }
        res.render('error', {
            error: err
        })
    }
}
const renderDashboardPage2 = async (req, res, next) => {
    try {
        res.render('Dashboard/dashboard2', {
            layout: 'layouts/main-layout',
        })
    } catch (error) {
        const err = {
            status: 400,
            message: error.toString()
        }
        res.render('error', {
            error: err
        })
    }
}

module.exports = {
    renderDashboardPage,
    renderDashboardPage2
}