const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/nodemyExpress')

const accountSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
}, {
    collection: 'accounts'
})

const AccountModel = new mongoose.model('account', accountSchema)

// setTimeout(() => {
//     for(let i=1; i<=100; ++i)
//         if(Math.ceil(Math.random()*10) % 3 === 1)
//             AccountModel.create({
//                 username: 'user_' + i,
//                 password: '1234' + i,
//                 role: 'student',
//             })
//                 .then(data => {
//                     console.log('thành công')
//                 })
//                 .catch(err => {
//                     console.log('lỗi')
//                 })
//         else if(Math.ceil(Math.random()*10) % 3 === 2)
//             AccountModel.create({
//                 username: 'user_' + i,
//                 password: '1234' + i,
//                 role: 'teacher',
//             })
//                 .then(data => {
//                     console.log('thành công')
//                 })
//                 .catch(err => {
//                     console.log('lỗi')
//                 })
//         else
//             AccountModel.create({
//                 username: 'user_' + i,
//                 password: '1234' + i,
//                 role: 'manager',
//             })
//                 .then(data => {
//                     console.log('thành công')
//                 })
//                 .catch(err => {
//                     console.log('lỗi')
//                 })
// })

// AccountModel.deleteMany({})
//     .then(data => {
//         console.log(1)
//     })
//     .catch(err => {
//         console.log(err)
//     })

AccountModel.find({})
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})

module.exports = AccountModel
