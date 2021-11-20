const express = require('express')
const jwt = require('jsonwebtoken')
const jwtLogin = express.Router()
const path = require('path')
const AccountModel = require('../model/accounts')
const fs = require('fs')

// Ví dụ về JWT
// const data = {username: 'Thịnh Văn', password: '1234567'}
// // sign bất đồng bộ
// const token = jwt.sign(data, 'thinh123', {
//     expiresIn: 20,
// }, (err, token) => {
//     console.log('token',token)
// })

// console.log('Thinh')

// verify
// try {
//     const result = jwt.verify(token, 'thinh123', (err, decoded) => {
//         console.log('decoded', decoded)
//     })
// } catch {
//     console.log('err')
// }

// login
jwtLogin.get('/login', (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../html/pageLogin.html'))
})

const putDataLogin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    AccountModel.findOne({
        username,
        password
    })
    .then(data => {
        if(data) {
            const privatekey = fs.readFileSync(path.join(__dirname, '../key/private.pem'))
            const token = jwt.sign({
                _id: data._id
            }, privatekey, { algorithm: 'RS256' })
            res.send({
                token,
                message: true,
                home: 'http://localhost:3000/jwt/check',
            })
        }
        else {
            res.send({message: false})
        }
    })
    .catch(err => {
        res.status(500).send('Lỗi server')
    })
}

jwtLogin.post('/', putDataLogin)

jwtLogin.get('/check', (req, res, next) => {
    try {
        const token = req.cookies.token
        if(token)
            next()
    }
    catch {
        res.redirect('./login')
    }
},
(req, res, next) => {
    res.redirect('./home')
})

jwtLogin.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../html/home.html'))
})

const checkSend = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const publicKey = fs.readFileSync(path.join(__dirname, '../key/publickey.crt'))
        const _id = jwt.verify(token, publicKey, { algorithms: ['RS256'] })._id
        AccountModel.findOne({
            _id,
        })
            .then(data => {
                req.data = data
                next()
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
    } catch {
        res.redirect('./login')
    }
}

// check thẩm quyền
const checkStudent = async (req, res, next) => {
    try {
        const role = req.data.role
        const allow = role === 'student' || role === 'teacher' || role === 'manager'
        if(allow)
            next()
    } catch {
        return res.send('Bạn không có quyền truy cập.')
    }
}

const checkTeacher = async (req, res, next) => {
    try {
        const role = req.data.role
        const allow = role === 'teacher' || role === 'manager'
        if(allow)
            next()
    } catch{
        return res.send('Bạn không có quyền truy cập.')
    }
}

const checkManager = async (req, res, next) => {
    try {
        const role = req.data.role
        const allow = role === 'manager'
        if(allow)
            next()
    } catch{
        return res.send('Bạn không có quyền truy cập.')
    }
}

jwtLogin.get('/student', checkSend, checkStudent, (req, res, next) => {
    res.send('You have a role is Student')
})

jwtLogin.get('/teacher', checkSend, checkTeacher, (req, res, next) => {
    res.send('You have a role is Teacher')
})

jwtLogin.get('/manager', checkSend, checkManager, (req, res, next) => {
    res.send('You have a role is Manager')
})

//check edit
const checkRoleEdit = async (req, res, next) => {
    try{
        const token = req.body.token
        const publicKey = fs.readFileSync(path.join(__dirname, '../key/publickey.crt'))
        const _id = jwt.verify(token, publicKey, { algorithms: ['RS256'] })._id
        AccountModel.findById(_id)
            .then(data => {
                if(data.role === 'manager')
                    next()
                else
                    res.send('Bạn không đủ thẩm quyền edit')
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
    }
    catch{
        res.redirect('./login')
    }
}

jwtLogin.post('/edit', checkRoleEdit, (req, res, next) => {
    res.send('Bây giờ bạn có thể edit')
})


module.exports = jwtLogin