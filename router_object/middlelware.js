const express = require('express')
const routerMid = express.Router()

// check đăng nhập 
const login = true
const checkLogin = (req, res, next) => {
    if(login)
        // khi req có data thì ngay lập tức sẽ chuyền vào req ở cửa tiếp theo
        // req.user = 'thinh'
        next()
    else
        res.send('Bạn chưa đăng nhập')
}
// check admin 
const checkAdmin = (req, res, next) => {
    // req.user = 'thinh'
    next()
}

routerMid.get('/middleware/admin', checkLogin, checkAdmin, (req, res) => {
    res.send('Dữ liệu admin')
})

routerMid.get('/middleware/login', checkLogin, (req, res, next) => {
    res.send('Dữ liệu nhười dùng')
})

// vd về middleware
routerMid.get('/middleware', (req, res, next) => {
    console.log('middleware1')
    next()
}, (req, res, next) => {
    console.log('middleware2')
    next()
}, (req, res, next) => {
    console.log('middleware3')
    next()
})

// middleware 4 tham số
// khi next(err) thì ngay lập tức nhảy xuống midd 4 tham số
// (err, req, res, next) {
//     console.log(err)
// }

module.exports = routerMid