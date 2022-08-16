const ctrl = {}
const model = require('../models/product')

ctrl.GetProdutcs = async (req, res) => {
   try {
      const data = await model.GetAll()
      return res.status(200).send(data)
   } catch (error) {
      res.status(500).send(error)
   }
}

ctrl.AddData = async (req, res) => {
   try {
      const { name, price, qty } = req.body
      const images = 'http://localhost:8080/' + req.file.path
      const data = await model.Save({ name, price, qty, images })
      res.status(200).send(data)
   } catch (error) {
      console.log(error)
      res.status(500).send(error)
   }
}

ctrl.Update = async (req, res) => {
   try {
      const { prod_id } = req.params
      const data = await model.update(prod_id, req.body)
      res.status(200).send(data)
   } catch (error) {
      res.status(500).send(error)
   }
}

module.exports = ctrl
