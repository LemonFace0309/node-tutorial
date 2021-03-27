const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = cb => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.log('test')
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

module.exports = class Product {
  constructor(title) {
    this.title = title
  }

  save() {
    getProductsFromFile(products => {
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
