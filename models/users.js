const bookshelf = require('../db/orm')

const User = bookshelf.model('User', {
  tableName: 'users',
  initialize () {
    this.on('saving', (model, attrs, options) => {
      console.log('saving event triggered')
      console.dir({
        model,
        attrs,
        options
      })
      if (!attrs.first_name) {
        throw new Error('Must provide first name')
      }
      if (!attrs.last_name) {
        throw new Error('Must provide last name')
      }
      if (attrs.first_name.length < 5) {
        throw new Error('firstname must be greater than 5 characters')
      }
    })
  }
})

module.exports = User
