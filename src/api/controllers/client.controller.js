const bcrypt = require('bcryptjs');
const Client = require('./../models/client.model')

const createClient = async (req, res, next) => {
    try {
        let {email, password} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const newClient = new Client({email, password:hashPassword})
        await newClient.save();
        res.json({message: 'Client Successfully created!'})
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const validateClient = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const client = await Client.findOne({ email: email });
        if(!client){
            throw 'Client not found!'
        }
        const validPassword = await bcrypt.compare(password, client.password);
        if(!validPassword){
            throw 'Invalid Password!'
        }
        res.json({clientID: client._id})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createClient,
    validateClient
}