const Product = require('../models/product')
const Cart = require('../models/cart')

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

exports.getProduct = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id, (product) => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product: product,
    })
  })
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(
          (cProduct) => cProduct.id === product.id
        )
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }
      res.render('shop/cart', {
        path: 'cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
      })
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const id = req.body.productId
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price)
    res.redirect('/')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: 'orders',
    pageTitle: 'Your Orders',
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}
