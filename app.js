const express = require('express')
const server = express()
const main = require('./src/main')
const db = require('./src/config/db')

async function init() {
   try {
      await db.connect()
      server.use(express.urlencoded({ extended: true }))
      server.use(express.json())
      server.use(main)

      server.listen(8080, () => {
         console.log('Sever ready')
      })
   } catch (error) {
      console.log(error)
   }
}
init()
