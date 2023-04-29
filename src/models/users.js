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
        db.query(`INSERT INTO public.users (username, "password") VALUES($1, $2)`, [data.username, data.hashPassword])
            .then((data) => {
                reslve('data derhasil disimpan')
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports = model
