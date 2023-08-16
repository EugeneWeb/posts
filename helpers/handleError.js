const handleError = err => {
    console.log(err)

    const title = 'Error'
    res.render(createPath('Error'), { title })
}

module.exports = handleError