const express = require('express')
const routerRestfulApi = express.Router()
const AccountModel = require('../model/accounts')


// Lấy data từ database
routerRestfulApi.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send('Lỗi server')
        })
})

// lấy 1 user từ data
routerRestfulApi.get('/:id', (req, res, next) => {
    const id  = req.params.id
    AccountModel.findById(id)
        .then(data => {
            res.send(data)
        })
        .then(err => {
            res.send('Có lỗi bên server')
        })
})

// Lấy up data lên db 
routerRestfulApi.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    AccountModel.create({
        username,
        password,
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })
})

// Update data trong db
routerRestfulApi.put('/:id', (req, res, next) => {
    const id = req.params.id
    const password = req.body.password

    AccountModel.updateOne({
        _id: id,
    }, {
        password,
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })
})

// Xóa data trong db
routerRestfulApi.delete('/:id', (req, res, next) => {
    const _id = req.params.id
    AccountModel.deleteOne({
        _id,
    })
        .then(data => {
            res.send('Xóa thành công')
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })
})

module.exports = routerRestfulApi