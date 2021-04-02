const path = require('path')
// const http = require('http')
// const routes = require('./routes')

const express = require('express') // exports a function
// const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const db = require('./util/database')

const app = express()
db.execute('SELECT * FROM products').then((res) => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

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

// const server = http.createServer(app)
//server.listen(3000)

app.listen(3000)
