const express = require('express')
const session = require('express-session')
require('dotenv').config()



const { isAdmin, requestTime, getParams, isAuthenticated } = require('./middlewares')
const app = express()
const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(requestTime)
app.use(express.static(`${__dirname}/../assets`))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5000
  } 
}))

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }

  next()
})

app.get('/auth/login', (req, res) => {
  req.session.user = {
    name: 'Mark'
  }

  res.send('you are authenticated')
})

app.post('/api/cart', (req, res) => {
  req.session.cart.push(req.body)
  res.send(req.session.cart)
})

app.get('/api/cart', (req, res) => {
  res.send(req.session.cart)
})

app.get('/api/planets', isAuthenticated, (req, res) => {
  let response = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Help!</title>
  </head>
  <body>
    <h1>Aloha!!!!!!</h1>
    <em>The request time is ${req.requestTime}</em>
  </body>
  </html>`
  res.send(response)
})

app.get('/api/planets/:id/:color/:tree', getParams, (req, res) => {
  res.send('aloha')
})

app.post('/api/planets', isAdmin, (req, res) => {
  console.log(11111111, req.body)
  res.send('hi')
})

app.use('/admin', isAdmin)

app.get('/admin/products', (req, res) => {
  res.send('get all products')
})

app.put('/admin/products', (req, res) => {
  res.send('update a product')
})

app.post('/admin/products', (req, res) => {
  res.send('create a product')
})

app.listen(SERVER_PORT, () => {
  console.log('listening on port', SERVER_PORT)
})