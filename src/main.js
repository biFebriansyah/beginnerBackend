const express = require('express')
const Routers = express.Router()

const products = require('./routers/product')
const users = require('./routers/users')
const auth = require('./routers/auth')

Routers.use('/products', products)
Routers.use('/users', users)
Routers.use('/auth', auth)

module.exports = Routers
