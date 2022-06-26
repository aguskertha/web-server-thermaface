const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderVisitor = async (req, res, next) => {
    try {
        const visitors = await axios.get('/api/visitor');
        const {name, deviceID, pictureURL} = req.user
        res.render('Admin/visitor', {
            layout: 'layouts/main',
            name,
            deviceID,
            pictureURL,
            visitors : visitors.data
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