const knex = require('../db/client')

module.exports = {
    all: () =>{
        return knex.select().from('events')//or select('*')
        .then(events =>{
            return events
        })
    }
}