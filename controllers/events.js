const knex = require('../db/client')
const { event } = require('../models') // deconstructing event property from models object
// const models = require('../models') these two lines are replaced by the one above
// const event = models.event

module.exports = {
  index: (req, res) => {
    event.all() // ask the model for all of our vents
      .then(events => {
        res.render('events/index', { events }) // when we get all the events respond with a view
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
