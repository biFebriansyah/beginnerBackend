const model = {}
const db = require('../config/db')

model.getAll = async ({ page, limit, order }) => {
    try {
        let query = format('SELECT * FROM products')

        if (order) {
            query = format(query + ' ORDER BY id %s', order)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            query = format(query + ' LIMIT %s OFFSET %s', limit, offset)
        }

        const { rows } = await db.query('SELECT COUNT(id) as "count" FROM public.products')
        const counts = rows[0].count

        const meta = {
            next: page == Math.ceil(counts / limit) ? null : `/api/v1/product/all?order=${order}&page=${Number(page) + 1}&limit=${limit}`,
            prev: page == 1 ? null : `/api/v1/product/all?order=${order}&page=${Number(page) - 1}&limit=${limit}`,
            counts
        }

        const prods = await db.query(query)
        return { data: prods.rows, meta }
    } catch (error) {
        console.log(error)
    }
}

model.Save = (data) => {
    console.log(data)
    return new Promise((reslve, reject) => {
        db.query(`INSERT INTO public.products ("name", price, quantity) VALUES($1, $2, $3)`, [data.name, data.price, Number(data.qty)])
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
