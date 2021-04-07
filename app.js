const path = require('path')
// const http = require('http')
// const routes = require('./routes')

const express = require('express') // exports a function
// const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./util/database')

const app = express()

// app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main'})) // registers a new templating engine. 'pug' is built in so it's not necessary. expresshbs initializes the engine
// app.set('view engine', 'handlebars')
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
// app.set('views', 'views')

app.use(express.urlencoded({ extended: false })) // parses req.body
app.use(express.static(path.join(__dirname, 'public'))) // grants read access to path

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
  .sync()
  .then((result) => {
    app.listen(3000)
  })
  .then((err) => {
    console.log(err)
  })
