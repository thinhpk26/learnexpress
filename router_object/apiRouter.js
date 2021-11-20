var express = require('express')

const router1 = express.Router()
router1.get('/', (req, res) => {
    res.json('router api')
})

router1.get('/cart', (req, res) => {
    res.json('router cart')
})

router1.get('/product', (req, res) => {
    res.json('router product')
})

router1.get('/:id', (req, res) => {
    res.json(`router user ${req.params.id}`)
})

module.exports = router1