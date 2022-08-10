const express = require('express')
const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.get('/', (req, res) => {
   res.send('welcome express')
})

//? req params
//? localhost:8080/hello/ebi
server.get('/hello/:name', (req, res) => {
   const names = req.params.name
   res.send(`hello worlds ${names}`)
})

//? req query
//? http://localhost:8080/search?name=ebiebi&umur=12
server.get('/search', (req, res) => {
   const { name, umur } = req.query
   res.send(`hello ${name} and age ${umur}`)
})

server.post('/product', (req, res) => {
   const { name, price, qty } = req.body

   res.json({ name, price, qty })
})

server.patch('/product', (req, res) => {
   const { email } = req.body

   res.json({ email })
})

server.delete('/product/:nameprod', (req, res) => {
   const { nameprod } = req.params

   res.send(`prodcuts ${nameprod} deleted`)
})

// 1024 - 65536
// bloking
server.listen(8080, () => {
   console.log('Sever ready')
})
