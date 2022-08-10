const express = require('express')
const Router = express.Router()
const ctrl = require('../controllers/product')

Router.get('/', ctrl.GetProdutcs)
Router.post('/', ctrl.AddData)

module.exports = Router
