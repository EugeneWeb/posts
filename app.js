const express = require('express')
const app = express()
const PORT = 3000

// const PASSWORD = 'wertyQ160'
// const DBNAME = 'DB1'
// const DBUSERNAME = 'eugene'

app.listen(PORT, err => console.log(err))

// Подключакм dotenv и используем через process.env переменные окружения, добавленные в .env файл
require('dotenv').config()

// Создаем функции для отображения сообщений разного цвета в консоли
const ch = require('chalk')
const errorMsg = ch.bgKeyword('white').rgb(256, 0, 0)
const successMsg = ch.bgKeyword('green').white

// Добавим функции chalk к БД
// ФУНКЦИИ ВОЗВРАЩАЮТ СТРОКИ, ПОЭТОМУ ИСПОЛЬЗУЕМ CONSOLE.LOG()
const mongoose = require('mongoose')
const db = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.blckrwv.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose
        .connect(db, { useNewUrlParser:true, useUnifiedTopology:true })
        .then(() => console.log(successMsg('Connected to DB')))
        .catch(err => console.log(errorMsg(err)))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

// Подключаем установленный пакет methodOverride и записываем ключ параметра url строки, в которой будет значение с запросом PUT
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms') )

const mainRoutes = require('./routes/main-routes')
const contactRoutes = require('./routes/contact-routes')
const faqRoutes = require('./routes/faq-routes')
const postRoutes = require('./routes/post-routes')
const apiPostRoutes = require('./routes/api-post-routes')
const { default: chalk } = require('chalk')

// Теперь после обновления api можно посылать запросы на это url адреса с помощью postman
// title, author, text берутся из тела запроса(тип x-www-form-urlencoded), поэтому при создания поста их объявляем там
app.use(mainRoutes)
app.use(contactRoutes)
app.use(faqRoutes)
app.use(postRoutes)
app.use(apiPostRoutes)

const createPath = require('./helpers/createPath')
app.use((req, res) => {
    const title = 'Error'

    res
        .status(404)
        .render(createPath('Error'), { title })
})

