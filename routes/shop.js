const path = require('path')

const express = require('express')

const adminData = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('shop.js', adminData.products)
  const products = adminData.products
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0})
  //res.send("<h1>Hello from Express</h1>")
  //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  // __dirname holds absolute path on os to project folder
  // path works on linux and windows systems
})

module.exports = router
