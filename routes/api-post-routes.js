const express = require('express')
const router = express.Router()

const {
    addPost,
    getPosts,
    getPost,
    deletePost,
    editPost
} = require('../controllers/api-post-controller')

// Убираем не нужные route'ы из post-route, оставляем: получение всех постов, получение одного поста по id, изменение поста по id, удаление поста по id, добавление поста
router.post('/api/add-post', addPost)
router.get('/api/posts', getPosts)
router.get('/api/post/:id', getPost)
router.delete('/api/posts/:id', deletePost)
router.put('/api/edit-post/:id', editPost)

module.exports = router