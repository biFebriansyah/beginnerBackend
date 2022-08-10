const model = {}
const db = require('../config/db')

model.GetAll = () => {
   return new Promise((reslve, reject) => {
      db.query('SELECT id_product, "name", price, qty FROM public.products')
         .then((data) => {
            reslve(data.rows)
         })
         .catch((err) => {
            reject(err)
         })
   })
}

model.Save = (data) => {
   return new Promise((reslve, reject) => {
      db.query(`INSERT INTO public.products ("name", price, qty) VALUES($1, $2, $3)`, [
         data.name,
         data.price,
         data.qty
      ])
         .then((data) => {
            reslve('data derhasil disimpan')
         })
         .catch((err) => {
            reject(err)
         })
   })
}

module.exports = model
