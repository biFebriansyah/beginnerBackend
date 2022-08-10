const { Pool } = require('pg')

const pool = new Pool({
   user: 'golang2',
   host: 'localhost',
   database: 'go2db',
   password: 'abcd12345'
})

module.exports = pool
