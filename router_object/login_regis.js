const express = require('express')
const AccountModel = require('../model/accounts.js')
const loginRegis = express.Router()

// Đăng kí
loginRegis.post('/register', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    AccountModel.findOne({
        username,
    })
    .then(data => {
        if(data)
            res.status(500).send('Tài khoản tồn tại')
        else
            return AccountModel.create({
                username,
                password,
            })
    })
    .then(data => {
        res.send('Tạo tài khoản thành công')
    })
    .catch(err => {
        res.status(400).send('Tạo tài khoản thất bại')
    })
})

// Đăng nhập
loginRegis.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    AccountModel.findOne({
        username,
        password,
    })
        .then(data => {
            if(data)
                res.send('Đăng nhập thành công!')
            else
                res.status(400).send('Tài khoản hoặc mật khẩu không chính xác!')
        })
        .catch(err => {
            res.status(500).send('Có lỗi server')
        })
})

loginRegis.get('/', (req, res, next) => {
    res.send('This is get method')
})

module.exports = loginRegis