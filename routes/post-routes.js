const express = require('express')
const router = express.Router()

const {
    getAddPost,
    addPost,
    getPosts,
    getPost,
    deletePost,
    getEditPost,
    editPost
} = require('../controllers/post-controller')

router.get('/add-post', getAddPost)
router.post('/add-post', addPost)
router.get('/posts', getPosts)
router.get('/post/:id', getPost)
router.delete('/posts/:id', deletePost)
router.get('/edit-post/:id', getEditPost)
router.put('/edit-post/:id', editPost)

module.exports = router