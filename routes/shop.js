const path = require('path')

const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('home')
  //res.send("<h1>Hello from Express</h1>")
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html')) 
  // __dirname holds absolute path on os to project folder
  // path works on linux and windows systems
  
})

module.exports = router