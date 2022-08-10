const ctrl = {}
const model = require('../models/product')

ctrl.GetProdutcs = async (req, res) => {
   try {
      const data = await model.GetAll()
      res.status(200).send(data)
   } catch (error) {
      res.status(500).send(data)
   }
}

ctrl.AddData = async (req, res) => {
   try {
      const { name, price, qty } = req.body
      const data = await model.Save({ name, price, qty })
      res.status(200).send(data)
   } catch (error) {
      res.status(500).send(data)
   }
}

module.exports = ctrl
