const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-tutorial', 'root', 'Alexmuir39*', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
