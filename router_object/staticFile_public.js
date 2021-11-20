const express = require('express')
const staticFile = express.Router()
const path = require('path')

staticFile.use('/public', express.static(path.join(__dirname, '../public')))

staticFile.get('/', (req, res, next) => {
    const home = path.join(__dirname, '../home.html')
    res.sendFile(home)
})

module.exports = staticFile