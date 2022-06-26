
const renderLogin = async (req, res, next) => {
    try {
        res.render('Admin/login', {
            layout: 'layouts/main-auth'
        })
    } catch (error) {
        
    }
}
const renderRegister = async (req, res, next) => {
    try {
        res.render('Admin/register', {
            layout: 'layouts/main-auth'
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderLogin,
    renderRegister
}