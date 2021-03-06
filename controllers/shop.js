const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getProduct = (req, res, next) => {
  const id = req.params.productId
  Product.findByPk(id)
    .then((product) => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products',
        product: product,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  // Product.findAll({where: {id: id}})
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts()
    })
    .then((cartProducts) => {
      res.render('shop/cart', {
        path: 'cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products[0]
        const oldQuantity = product.cartItem.quantity
        newQuantity += oldQuantity
        return product
      }
      return Product.findByPk(prodId)
    })
    .then((product) => {
      console.log(product.id)
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const id = req.body.productId
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: id } })
    })
    .then((products) => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then((result) => {
      res.redirect('/cart')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postOrder = (req, res, next) => {
  let cartProducts
  let fetchedCart
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then((products) => {
      cartProducts = products
      return req.user.createOrder()
    })
    .then((order) => {
      return order.addProducts(
        cartProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity }
          return product
        })
      )
    })
    .then((result) => {
      return fetchedCart.setProducts(null)
    })
    .then((result) => {
      res.redirect('/orders')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products']})
    .then((orders) => {
      res.render('shop/orders', {
        path: 'orders',
        pageTitle: 'Your Orders',
        orders: orders,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
