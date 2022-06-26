
const index = async (req, res, next) => {
    try {
        res.render('index', {
            layout: 'layouts/main-home'
        })
    } catch (error) {
        
    }
}

module.exports = {
    index
}