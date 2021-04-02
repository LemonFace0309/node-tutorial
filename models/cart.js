const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 }
      try {
        cart = JSON.parse(data)
      } catch {}

      const existingProductIdx = cart.products.findIndex(
        (prod) => prod.id == id
      )
      const existingProduct = cart.products[existingProductIdx]
      let updatedProduct
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty += 1
        cart.products[existingProductIdx] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice += +price
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err)
      })
    })
  }

  static deleteProduct(id, productPrice) {
    try {
      fs.readFile(p, (err, data) => {
        if (err) {
          console.log(err)
        }
        const updatedCart = { ...JSON.parse(data) }
        const product = updatedCart.products.find((prod) => id === prod.id)
        if (!product) {
          return;
        }
        updatedCart.products = updatedCart.products.filter(
          (prod) => id !== prod.id
        )
        updatedCart.totalPrice -= productPrice * product.qty
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err)
        })
      })
    } catch {
      return
    }
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      try {
        const cart = JSON.parse(fileContent)
        cb(cart)
      } catch {
        cb(null)
      }
    })
  }
}
