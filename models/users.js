const bookshelf = require('../db/orm')

const User = bookshelf.model('User', {
  tableName: 'users'
})

module.exports = User
