const jwt = require('jsonwebtoken')
const respone = require('../helpers/respone')

const auth_validate = (req, res, next) => {
   const { authtoken } = req.headers

   if (!authtoken) {
      return respone(res, 401, 'silahkan login dlu')
   }

   jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
      if (err) {
         return respone(res, 401, err, true)
      } else {
         req.user = decode.username
         next()
      }
   })
}

module.exports = auth_validate
