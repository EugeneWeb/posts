const createPath = require('../helpers/createPath')

const getFaq = (req, res) => {
    const title = 'Faq'

    res.render(createPath('faq'), { title })
}

module.exports = {
    getFaq
}