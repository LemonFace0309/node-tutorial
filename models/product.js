const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    try {
      cb(JSON.parse(data))
    } catch {
      cb([])
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        products = updatedProducts
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  // without a callback, the function below doesn't return anything since
  //   fs.readFile is asynchronous (the second argument is a callback).
  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      cb(products.find((product) => product.id === id))
    })
  }
}
