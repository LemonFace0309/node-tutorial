const path = require('path')
// const http = require('http')
// const routes = require('./routes')

const express = require('express') // exports a function
// const expressHbs = require('express-handlebars')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main'})) // registers a new templating engine. 'pug' is built in so it's not necessary. expresshbs initializes the engine
// app.set('view engine', 'handlebars')
app.set('view engine', 'pug')
// app.set('views', 'views')

app.use(express.urlencoded({ extended: false })) // parses req.body
app.use(express.static(path.join(__dirname, 'public'))) // grants read access to path

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  // res.status(404).send('<h1>Page not Found</h1>')
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 'Page Not Found' })
})

// const server = http.createServer(app)
//server.listen(3000)

app.listen(3000)
