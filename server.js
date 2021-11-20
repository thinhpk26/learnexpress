const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const app = express()
// api router
const router1 = require('./router_object/apiRouter')
// middleware
const routerMid = require('./router_object/middlelware.js')
// restful api
const routerRestfulApi = require('./router_object/restful_Api.js')
// login register
const loginRegis = require('./router_object/login_regis.js')
// staticfile
const staticFile = require('./router_object/staticFile_public')
// divide Api
const divideApi = require('./router_object/divideApi')
// jwt to make login
const jwtLogin = require('./router_object/Jwt')
// jwt session_cookie
const session_cookie = require('./router_object/session_cookie')

app.use(cors())
app.use(cookieParser())
// syntax body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('Wellcome to Learning express on Nodemy')
})

app.use('/api', router1)
app.use('/', routerMid)
app.use('/restful_api', routerRestfulApi)
app.use('/login_Regis', loginRegis)
app.use('/staticFile', staticFile)
app.use('/divideApi', divideApi)
app.use('/jwt', jwtLogin)
app.use('/session-cookie', session_cookie)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})