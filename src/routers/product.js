const express = require('express')
const Router = express.Router()
const authCehck = require('../middleware/authCheck')
const ctrl = require('../controllers/product')
const upload = require('../middleware/upload')

Router.get('/', authCehck, ctrl.GetProdutcs)
Router.post('/', upload.single('image'), ctrl.AddData)
Router.put('/:prod_id', authCehck, ctrl.Update)

module.exports = Router
