const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  Product.create({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
  })
}

exports.getEditProduct = (req, res, next) => {
  // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const id = req.params.productId
  Product.findById(id, (product) => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId
  const upTitle = req.body.title
  const upPrice = req.body.price
  const upImgUrl = req.body.imageUrl
  const upDesc = req.body.description
  const updatedProduct = new Product(id, upTitle, upImgUrl, upDesc, upPrice)
  updatedProduct.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId
  Product.deleteById(id)
  res.redirect('/admin/products')
}