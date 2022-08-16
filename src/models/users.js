const model = {}
const db = require('../config/db')

model.GetAll = () => {
   return new Promise((reslve, reject) => {
      db.query('SELECT * FROM public.users ORDER BY created_at DESC')
         .then((data) => {
            reslve(data.rows)
         })
         .catch((err) => {
            reject(err)
         })
   })
}

model.GetByUser = (username) => {
   return new Promise((reslve, reject) => {
      db.query('SELECT * FROM public.users WHERE username = $1', [username])
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
      db.query(`INSERT INTO public.users (username, "password") VALUES($1, $2)`, [
         data.username,
         data.hashPassword
      ])
         .then((data) => {
            reslve('data derhasil disimpan')
         })
         .catch((err) => {
            console.log(err)
            reject(err)
         })
   })
}

model.update = (id, data) => {
   const query = `UPDATE public.products 
   SET 
       name = COALESCE(NULLIF($1, ''), name),
       price = COALESCE(NULLIF($2, ''), "price"),
       quantity = COALESCE(NULLIF($3, 0), quantity)
       WHERE product_id = $4
   RETURNING *`

   return new Promise((reslve, reject) => {
      db.query(query, [data.name, data.price, data.qty, id])
         .then((data) => {
            reslve(data.rows)
         })
         .catch((err) => {
            console.log(err)
            reject(err)
         })
   })
}

module.exports = model
