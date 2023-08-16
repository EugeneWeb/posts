const createPath = require('../helpers/createPath')

const Contact = require('../models/contact')

const handleError = require('../helpers/handleError')

const getContacts = (req, res) => {
    const title = 'Contacts'

    Contact
            .find()
            .then(contacts =>{ res.render(createPath('contacts'), { title, contacts })})
            .catch(handleError)
}

const getAboutUs = (req, res) => {
    const title = 'Contacts'

    res.redirect(createPath('contacts'), { title })
}

module.exports = {
    getContacts,
    getAboutUs
}