const express = require('express')
const router = express.Router()

const {
    getFaq
} = require('../controllers/faq-controller')

router.get('/faq', getFaq )

module.exports = router