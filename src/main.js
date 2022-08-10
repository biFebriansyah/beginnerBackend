const express = require('express')
const Routers = express.Router()

const products = require('./routers/product')

Routers.use('/products', products)

module.exports = Routers
