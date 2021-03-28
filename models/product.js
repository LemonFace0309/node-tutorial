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
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  // without a callback, the function below doesn't return anything since
  //   fs.readFile is asynchronous (the second argument is a callback).
  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
}
