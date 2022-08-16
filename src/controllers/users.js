const ctrl = {}
const model = require('../models/users')
const hashing = require('../helpers/hash')
const respone = require('../helpers/respone')

ctrl.GetProdutcs = async (req, res) => {
   try {
      const data = await model.GetAll()
      return respone(res, 200, data)
   } catch (error) {
      return respone(res, 500, 'terjadi kesalahan', true)
   }
}

ctrl.AddData = async (req, res) => {
   try {
      const { username, password } = req.body

      const hashPassword = await hashing(password)
      const data = await model.Save({ username, hashPassword })
      return respone(res, 200, data)
   } catch (error) {
      return respone(res, 500, 'terjadi kesalahan', true)
   }
}

ctrl.Update = async (req, res) => {
   try {
      const { user_id } = req.params
      const data = await model.update(user_id, req.body)
      res.status(200).send(data)
   } catch (error) {
      res.status(500).send(error)
   }
}

module.exports = ctrl
