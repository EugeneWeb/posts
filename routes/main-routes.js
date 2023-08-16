const express = require('express')

// Для того, чтобы написать роутинг вне сервера используем router(далее в добавляем в app с синтаксисом похожим на middle war'ы)
const router = express.Router()

const {
    getHome
} = require('../controllers/main-controller')

router.get('/', getHome)
router.get('/home', getHome)
router.get('/index.html', getHome)

// Экспортируем router для использования на сервере
module.exports = router