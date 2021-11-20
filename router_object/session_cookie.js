const express = require('express')
const path = require('path')
const session_cookie = express.Router()
const session = require('express-session')
const redis = require("redis");
const client = redis.createClient();
let RedisStore = require('connect-redis')(session)


client.on("error", function(error) {
  console.error(error);
});

session_cookie.use(session({
    secret: 'thinh&thinhhj1',
    store: new RedisStore({ host: 'localhost', port: 6379, client, ttl: 86400 }),
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 30000,
    }
}))

session_cookie.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../html/session_cookie.html'))
})

session_cookie.get('/demo', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
})

session_cookie.get('/logout', (req, res, next) => {
    req.session.destroy
    res.send('loged out')
})

module.exports = session_cookie