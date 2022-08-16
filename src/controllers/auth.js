const ctrl = {}
const model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcr = require('bcrypt')
const respone = require('../helpers/respone')

const genToken = async (username) => {
   try {
      const payload = {
         user: username,
         role: 'admin'
      }

      const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1m' })

      const result = {
         msg: 'token created',
         token: token
      }

      return result
   } catch (error) {
      throw error
   }
}

ctrl.Login = async (req, res) => {
   try {
      const { username, password } = req.body
      const passDb = await model.GetByUser(username)

      if (passDb.length <= 0) {
         return respone(res, 401, 'username tidak terdaftar', true)
      }

      const check = await bcr.compare(password, passDb[0].password)

      if (!check) {
         return respone(res, 401, 'password salah', true)
      }

      const result = await genToken(username)
      return respone(res, 200, result)
   } catch (error) {
      console.log(error)
      return respone(res, 500, 'terjadi kesalahan', true)
   }
}

module.exports = ctrl
