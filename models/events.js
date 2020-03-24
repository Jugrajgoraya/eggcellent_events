const bookshelf = require('../db/orm')

const Event = bookshelf.model('Event', {
  tableName: 'events'
})

module.exports = Event
