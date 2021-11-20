const express = require('express')
const AccountModel = require('../model/accounts')
const path = require('path')
const divideApi = express.Router()
divideApi.use('/public', express.static(path.join(__dirname, '../public')))

divideApi.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../home.html'))
})

divideApi.get('/user', (req, res, next) => {
    const pageSize = 10
    let page  = req.query.page
    if(page) {
        if(page <= 0)
            page = 1
        page = Number.parseInt(page)
        const numberPass = (page - 1) * pageSize
        AccountModel.find({})
            .skip(numberPass)
            .limit(pageSize)
            .then(data => {
                AccountModel.countDocuments({})
                    .then(total => {
                        res.send({
                            pageSize,
                            total,
                            users: data,
                        })
                    })
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
    else   
        AccountModel.find({})
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
})

module.exports = divideApi