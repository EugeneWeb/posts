const Post = require('../models/post')
const createPath = require('../helpers/createPath')

const handleError = require('../helpers/handleError')

const getAddPost = (req, res) => {
    const title = 'Add post'

    res.render(createPath('addPost'), { title })
}

const addPost = (req, res) => {
    const { author, title, text } = req.body
    const newPost = new Post({ author, title, text })

    newPost
        .save()
        .then((result) => res.redirect(`/post/${result.id}`))
        .catch(handleError)
}

const getPosts = (req, res) => {
    const title = 'Posts'

    Post
        .find()
        .sort({createdAt: -1})
        .then(posts => res.render(createPath('posts'), { title, posts }) )
        .catch(handleError)
}

const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(postFromBD => {
            const { title, author, text, _id:id, createdAt} = postFromBD
            const post = { title, author, text, id, createdAt}
            res.render(createPath('post'), { post })
           })
        .catch(handleError)
}

const deletePost = (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(handleError)
}

const getEditPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(postFromBD => {
             const { title, author, text, _id:id, createdAt} = postFromBD
             const post = { title, author, text, id, createdAt}
             res.render(createPath('editPost'), { post })
            })
        .catch(handleError)
}

const editPost = (req, res) => {
    const { title, author, text } = req.body
    const id = req.params.id

    Post
        .findByIdAndUpdate(id, {title, author, text})
        .then(result =>{ res.redirect(`/post/${id}`) })
        .catch(handleError)
}

module.exports = {
    getAddPost,
    addPost,
    getPosts,
    getPost,
    deletePost,
    getEditPost,
    editPost
}

