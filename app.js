const path = require('path')
// const http = require('http')
// const routes = require('./routes')

const express = require('express') // exports a function
// const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const app = express()

// app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main'})) // registers a new templating engine. 'pug' is built in so it's not necessary. expresshbs initializes the engine
// app.set('view engine', 'handlebars')
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
// app.set('views', 'views')

app.use(express.urlencoded({ extended: false })) // parses req.body
app.use(express.static(path.join(__dirname, 'public'))) // grants read access to path

app.use((req, res, next) => {
  // only runs on incoming requests. Therefore, npm start will
  // only register this as middleware and run sequelize.
  User.findByPk(1)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err)
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product) // not required, only there for clarity
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.hasMany(CartItem) // not required, only there for clarity
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})

sequelize
  .sync() // {force: true} overrides tables if new relations are made
  .then((result) => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Charles',
        email: 'test@test.com',
      })
    }
    return user // automatically resolves into a promise
  })
  .then((user) => {
    return user.createCart()
  })
  .then(cart => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })
