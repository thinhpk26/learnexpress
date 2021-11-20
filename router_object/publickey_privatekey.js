const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

// const privateKey = fs.readFileSync(path.join(__dirname, '../key/private.pem'))
// const token = jwt.sign({username: 'thịnh', password: 'thinh&thinhhj1'}, privateKey, { algorithm: 'RS256'}, function(err, data) {
//     console.log(data)
//     console.log(err)
// })

const publicKey = fs.readFileSync(path.join(__dirname, '../key/publickey.crt'))
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRo4buLbmgiLCJwYXNzd29yZCI6InRoaW5oJnRoaW5oaGoxIiwiaWF0IjoxNjM1NzU3NzEwfQ.R94B-IIZY89-yJ_OZ94Y1A86FYkMtKPhrNJXLBcLa8A58tmOC_09PdDdgX50wUCiXo1IhKfPhRkT8-wKa9NrmygtK9iraiV79S-7kvSx3ZyKLgd8hoyNZuAAcdPD7ewfJE-VTbb0-H6RKaBkOs7Thvuqx2m3Kj0ImNJyC3BlGXUKjdK-OJO0runnme1bnmLqAWxI0k7YaYUcakLGAgWUoAX7m86SW14UmGiQoRUgncULrcp4GZyOBZYvu9uHApIesY1SKBbIDood0zBk1sVV4Yz5_KQqnlz1P5D6v9AlRH_PhYU2K24Y3oPI0C8Y2cb7KJVXgfeYgS4Tol_ZQFdlkg'
jwt.verify(token, publicKey, { algorithms: ['RS256'] }, function(err, data) {
    console.log(data)
})

console.log(1)
