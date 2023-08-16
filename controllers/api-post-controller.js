const Post = require('../models/post')
const handleError = require('../helpers/handleError')

const addPost = (req, res) => {
    const { title, text, author } = req.body
    const newPost = new Post({ title, text, author })

    // С помощью функции .json(объект) возвращаем json файл в ответ клиенту
    newPost
        .save()
        .then(post => {
            res
                .status(200)
                .json(post)
        })
        .catch(handleError)
}

const getPosts = (req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then(posts => {
             res
                .status(200)
                .json(posts)
         })
        .catch(handleError)
}

const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(postFromBD => {
            const { title, author, text, _id:id, createdAt} = postFromBD
            const post = { title, author, text, id, createdAt}
            res
                .status(200)
                .json(post)
           })
        .catch(handleError)
}

const deletePost = (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res
                .status(200)
                .json(result)
        })
        .catch(handleError)
}

const editPost = (req, res) => {
    const id = req.params.id
    const { title, author, text } = req.body

// Параметр new: true позволяет возвращать не старое значение, которое было обновлено, а новое
    Post
        .findByIdAndUpdate(id, {title, author, text}, {new: true})
        .then(result =>{ 
            res
                .status(200)
                .json(result)
         })
        .catch(handleError)
}

module.exports = {
    addPost,
    getPosts,
    getPost,
    deletePost,
    editPost
}

