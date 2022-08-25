const Contact = require('../models/contact.model')

const createContact = async (req, res, next) => {
    try {
        const {name, email, subject, message} = req.body
        const newContact = await Contact({name, email, subject, message})
        await newContact.save()
        res.json({message: 'Successfully send contact!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({createdAt: -1})
        res.json(contacts)

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createContact,
    getContacts
}