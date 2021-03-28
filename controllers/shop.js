const Product = require('../models/product')


exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
    })
  })
  //res.send("<h1>Hello from Express</h1>")
  //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  // __dirname holds absolute path on os to project folder
  // path works on linux and windows systems
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    })
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: 'cart',
    pageTitle: 'Your Cart',
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}
