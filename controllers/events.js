const knex = require('../db/client')
const { event } = require('../models') // deconstructing event property from models object
// const models = require('../models') these two lines are replaced by the one above
// const event = models.event

module.exports = {
  index: (req, res) => {
    event.all() // ask the model for all of our events
      .then(events => {
        res.render('events/index', { events }) // when we get all the events respond with a view
      })
  },
  show: (req, res) => {
    // params.id is the value coming from the URL
    const { id } = req.params
    event.one(id).then(events =>{
      if(events.length > 0 ){
        res.render('events/show', {event : events[0] })
      }
      else{
        res.send(`no event on id ${id} `)
      }
    })
  },

  create: (req, res) => {
    const { title, description } = req.body
    event.create({ title, description })
      .then(event => {
        res.send(event)
      })
  },
  new: (req, res) => {
    res.render('events/new')
  }
}
